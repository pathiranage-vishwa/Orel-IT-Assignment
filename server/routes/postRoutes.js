import express from "express";
import { getAllPosts, likePost,addPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/authenticate.js";

const router = express.Router();

//Read all posts
router.get("/", verifyToken, getAllPosts);

//Update like count
router.patch("/:id/like", verifyToken, likePost);

export default router;