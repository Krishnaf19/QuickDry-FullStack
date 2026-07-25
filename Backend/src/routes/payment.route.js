import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { razorPayOrder, verifyPayment } from "../controllers/payment.controller.js"

const router = Router()

router.route("/create-order").post(verifyJWT, razorPayOrder)
router.route("/verify").post(verifyJWT, verifyPayment)

export default router