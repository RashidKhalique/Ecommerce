import Coupon from "../model/Coupons.model.js";
import Product from "../model/product.model.js";
let handleCoupons = async (req, res) => {
    const { code, discountValue, expirationDate, productId } = req.body;
    console.log(productId);
    
    // Validate required fields
    if (!code || !discountValue || !expirationDate || !productId) {
        return res.status(400).json({
            message: 'All fields are required, including productId',
        });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        const newCoupon = await Coupon.create({
            code,
            discountValue,
            expirationDate,
            productId,  
        });

        return res.status(201).json({
            success: true,
            message: "Coupon added successfully",
            coupon: newCoupon,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to handle coupon',
            details: err.message
        });
    }
};

const validateCoupons = async (req, res) => {
  const { code, productIds } = req.body;
    try {
     
      
      const coupon = await Coupon.findOne({ code });

      if (!coupon) {
        return res.status(400).json({ message: 'Invalid coupon code' });
      }
  
      console.log('Coupon productId:', coupon.productId);
      if (new Date(coupon.expirationDate) < new Date()) {
        return res.status(403).json({ message: 'Coupon is not valid (expired)' });
      }
      const validProductIds = productIds.filter(id => id === coupon.productId);
      if (validProductIds.length === 1) {
        return res.json({ success: true, discount: coupon });
      } else {
        return res.status(400).json({ message: 'Coupon is not valid for the provided product' });
      }
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  



const Couponshow = async(req,res)=>{
    const coupon = await Coupon.find();
    if(!coupon)
    {
        res.status(400).json({success:false,message:"Coupon not Found"})
    }
    res.status(200).send(coupon)
}


const Coupondelete = async (req, res) => {
    const { id } = req.params;


    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
        return res.status(400).json({ success: false, message: "Coupon not found" });
    }

    return res.status(200).json({ success: true, message: "Coupon deleted successfully" });
}

export default { handleCoupons, validateCoupons , Couponshow,Coupondelete };
