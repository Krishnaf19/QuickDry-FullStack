import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())


//route
import userRouter from "./routes/user.route.js"
import storeRoute from "./routes/store.route.js"
import productRoute from "./routes/product.route.js"
import reviewRoute from "./routes/review.route.js"
import cartRoute from "./routes/cart.route.js"
import orderRoute from "./routes/order.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/store", storeRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/review", reviewRoute)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/order", orderRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    })
})


export default app