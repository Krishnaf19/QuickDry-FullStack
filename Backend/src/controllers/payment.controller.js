import { razorpay } from "../config/razorpay.config.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Cart } from "../models/cart.model.js"
import { Order } from "../models/order.model.js"
import { transporter } from "../config/mail.config.js"
import crypto from "crypto"



const razorPayOrder = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({ user: req.user?._id }).
        populate("items.product")

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty")
    }

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0)
    const amountInPaise = totalPrice * 100

    const razorOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt-${Date.now()}`,
        notes: { userId: req.user?._id.toString() }
    })

    const order = await Order.create({
        user: req.user?._id,
        store: cart.store,
        items: cart.items,
        totalPrice,
        razorpayOrderId: razorOrder.id,
        status: "pending"
    })

    return res.status(200).json(
        new ApiResponse(200, {
            key: process.env.RAZORPAY_API_KEY,
            orderId: razorOrder.id,
            amount: amountInPaise,
            currency: "INR",
            dbOrderId: order._id
        }, "Razorpay order created")
    )
})


const verifyPayment = asyncHandler(async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw new ApiError(400, "Missing payment verification fields")
    }

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex")

    if (expectedSignature !== razorpay_signature) {
        await Order.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { status: "failed" }
        )
        throw new ApiError(400, "Payment verification failed")
    }

    const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
            razorpayPaymentId: razorpay_payment_id,
            status: "paid"
        },
        {
            new: true
        }
    )

    if (!order) {
        throw new ApiError(404, "Order not found for this payment")
    }

    await Cart.findOneAndUpdate(
        { user: req.user._id, store: order.store },
        { items: [] }
    )

    return res.status(200).json(
        new ApiResponse(200, order, "Payment verified successfully")
    )
})


const razorpayWebhook = asyncHandler(async (req, res) => {

    const signature = req.headers["x-razorpay-signature"]

    if (!signature) {
        throw new ApiError(400, "Missing webhook signature header")
    }

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(req.body) 
        .digest("hex")

    if (expectedSignature !== signature) {
        throw new ApiError(400, "Invalid webhook signature")
    }

    const event = JSON.parse(req.body)
    const payment = event.payload?.payment?.entity

    if (event.event === "payment.captured" && payment) {

        const order = await Order.findOneAndUpdate(
            { razorpayOrderId: payment.order_id, status: { $ne: "paid" } }, 
            { razorpayPaymentId: payment.id, status: "paid" },
            { new: true }
        ).populate({ path: "user", select: "fullName email" })

        if (order) {
            await Cart.findOneAndUpdate(
                { user: order.user._id, store: order.store },
                { items: [] }
            )

            try {
                await transporter.sendMail({
                    from: `"Your Company" <${process.env.SMTP_USER}>`,
                    to: order.user?.email,
                    subject: "Order Confirmed",
                    html: `<h2>Thank you for your order, ${order.user.fullName}!</h2>
                           <p>Your payment was successful and your order has been confirmed.</p>
                           <p><strong>Order ID:</strong> ${order._id}</p>
                           <p><strong>Amount Paid:</strong> ₹${order.totalPrice}</p>
                           <p><strong>Status:</strong> ${order.orderStatus}</p>`
                })
            } catch (error) {
                console.error("Order confirmation email failed:", error.message)
            }
        }
    }

    if (event.event === "payment.failed" && payment) {
        await Order.findOneAndUpdate(
            { razorpayOrderId: payment.order_id },
            { status: "failed" }
        )
    }

    return res.status(200).json(new ApiResponse(200, {}, "Webhook processed"))
})


export { razorPayOrder, verifyPayment, razorpayWebhook }