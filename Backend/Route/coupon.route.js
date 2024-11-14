import Coupon from "../Controllers/Coupon.js";
import allitem from "../Controllers/allitem.js"
import { Router } from "express";

const router = Router();

router.post('/coupon', Coupon.handleCoupons);
router.get('/coupon', Coupon.Couponshow);
router.post('/coupon/validate', Coupon.validateCoupons);
router.delete('/coupon/:id', Coupon.Coupondelete);
router.get('/all',allitem);
export default router;  
