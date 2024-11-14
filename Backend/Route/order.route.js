import { Router } from "express";
import showOrder from "../Controllers/showOrder.js";
import orderManagementdb from "../Controllers/orderManagementdb.js";
import updateOrder from "../Controllers/updateOrder.js";
import alldaysdata from "../Controllers/alldaysdata.js";

const router = Router();

router.post('/orders', orderManagementdb ); // Changed from /orderManagement to /orders
router.get('/orders/show', showOrder); // Added dynamic parameter for showing a specific order
router.put('/orders/updateorder', updateOrder);
router.get('/alldaysdata',alldaysdata)

export default router;  
