import User from "../model/user.model.js";
import OrderManagement from "../model/OrderManagementdb.model.js";
import Product from "../model/product.model.js";

const allitem = async (req, res) => {
    try {

        const AllProducts = await Product.find();
        const AllOrders = await OrderManagement.find();
        const AllUsers = (await User.find()).length;
        const TotalProduct = AllProducts.length;
        const TotalOrder = AllOrders.length;

        const DeliveredOrders = AllOrders.filter(order => order.DeliveryStatus === 'Delivered').length;
        const PendingOrders = AllOrders.filter(order => order.DeliveryStatus === 'Pending').length;

      


        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            TotalProduct,
            TotalOrder,
            DeliveredOrders,
            PendingOrders,
            AllUsers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export default allitem;
