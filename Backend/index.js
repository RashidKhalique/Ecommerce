import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet"; 
import authRouter from "./authRouter/authRoute.js";
import { router as productRouter } from "./Route/product.route.js";
import orderRoute from "./Route/order.route.js";
import StripePayment from "./Controllers/Stripe.js";
import couponRouter from "./Route/coupon.route.js";  // Import the coupon router

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
}));

app.use(helmet());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', authRouter);  // Auth routes
app.use('/api/product', productRouter);  // Product routes
app.use('/api/order', orderRoute);  // Order routes
app.post('/api/payment', StripePayment);  // Stripe payment route

// Use the coupon router for coupon-related routes
app.use('/api/discount', couponRouter);  // Coupons are handled under '/api/coupon' route

// Error Handling Middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: "error",
        message: err.message,
    });
});

mongoose.connect(process.env.mongoURI)
    .then(() => {
        console.log("Database connection established successfully");
    })
    .catch((err) => {
        console.error("Database connection error: ", err);
        process.exit(1); 
    });



// Start Server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
