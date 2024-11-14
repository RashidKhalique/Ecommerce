import OrderManagement from "../model/OrderManagementdb.model.js";

const showOrder = async (req, res, next) => {
    try {
        const OrderShow = await OrderManagement.find({});

        if (!OrderShow.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        res.status(200).json({ success: true, message: "List of orders", OrderShow });
    } catch (err) {
        // Log the error for debugging and send a user-friendly message
        console.error("Error fetching orders:", err);
        res.status(500).json({ success: false, message: "An error occurred while fetching orders." });
    }
};

export default showOrder;
