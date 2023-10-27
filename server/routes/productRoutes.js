import express from "express";
import { getRecommendedProducts,getProductDetails } from "../controllers/productsCtrl.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.get("/items", auth, getRecommendedProducts);
router.get("/item/:id", auth, getProductDetails);

export default router;