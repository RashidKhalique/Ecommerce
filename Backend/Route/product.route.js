import { Router } from "express";
import CreateProduct from "../Controllers/CreateProduct.js";
import ShowProduct from "../Controllers/ShowProducts.js";
import deleteProduct from "../Controllers/deleteProduct.js";
import ShowAllUser from "../Controllers/ShowAllUser.js";
import editProduct from '../Controllers/editProduct.js';
import StripePayment from "../Controllers/Stripe.js"; 
import orderManagementdb from "../Controllers/orderManagementdb.js"
import updateUser from "../Controllers/updateUser.js";
import deleteUser from "../Controllers/deleteUser.js";
import sendEmail from "../Controllers/sendemail.js";


const router = Router();

router.route("/create").post(CreateProduct);
router.route("/show").get(ShowProduct);
router.route('/delete/:id').delete(deleteProduct);
router.route('/edit/:id').put(editProduct);
router.route("/showuser").get(ShowAllUser);
router.route('/stripe-payment').post(StripePayment);
router.route('/orders',orderManagementdb)
router.route('/updateUser/:id').put(updateUser)
router.route('/userDelete/:id').delete(deleteUser)
router.route('/send-email').post(sendEmail)



// router.route('/')



export { router };
