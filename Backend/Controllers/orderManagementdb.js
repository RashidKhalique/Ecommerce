import OrderManagement from "../model/OrderManagementdb.model.js";

const orderManagementdb = async (req, res, next) => {
    try {
        const {
            orderId,
            Customer,
            email,
            Product,
            DeliveryPricing,
            DeliveryDate,
            TotalAmount,
            DeliveryStatus,
            PaymentMethod,
            CouponAmount
        } = req.body;

        // Create the order in the database
        const order = await OrderManagement.create({
            orderId,
            Customer,
            email,
            Product,
            DeliveryPricing,
            TotalAmount,
            DeliveryStatus,
            PaymentMethod,
            CouponAmount
        });

        // Respond with the created order
        res.status(201).json({ success: true, message: "Order successfully placed", order });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal Server Error' }); // Handle unexpected errors
        next(err); // Pass error to the next middleware for centralized error handling
    }
};

export default orderManagementdb;
