import mongoose from "mongoose";


const OrderManagementSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    Customer: { type: String, required: true },
    email: { type: String },
    Product: [],
    DeliveryPricing: { type: Number, required: true },
    TotalAmount:{
       type: Number,
       default: 0  
    },
    CouponAmount:{
      type:Number,
      default:0
    },
    DeliveryDate: {
        type: Date,
        default: Date.now,
    },
    DeliveredDate: {
        type: String,
        default: "Deliverd Soon"
    },
    DeliveryStatus: {
        type: String,
        enum: ["Pending", "Processing", "Delivered"],
        default: "Pending"
    },
    PaymentMethod: { type: String, required: true }
}, { timestamps: true });

const OrderManagement = mongoose.model("OrderManagement", OrderManagementSchema);
export default OrderManagement;
