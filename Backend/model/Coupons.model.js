import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true,
    },
    discountValue: {
        type: Number,
        required: [true, 'Discount value is required'],
    },
    expirationDate: {
        type: Date,
        required: [true, 'Expiration date is required'],
    },
    productId:{
        type:String
    }
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
