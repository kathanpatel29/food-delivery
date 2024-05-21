import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder } from "../controllers/orderController.js"
import { verifyOrder } from "../../frontend/src/pages/PlaceOrder/PlaceOrder.jsx";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)

export default orderRouter;