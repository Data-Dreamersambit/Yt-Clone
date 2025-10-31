import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  addCommentToVideo,
  getVideoComments,
  updateComment,
  deleteComment,
  replyToComment,
  likeOrUnlikeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// 💬 Add comment to a video (supports nested replies via body.parentCommentId)
router.post("/:id/comment", isLoggedIn, addCommentToVideo);

// 💭 Get all comments for a video
router.get("/:id/comments", getVideoComments);

// ✏️ Update a comment (owner only)
router.patch("/:id", isLoggedIn, updateComment);

// 🗑️ Delete a comment (owner only)
router.delete("/:id", isLoggedIn, deleteComment);

// 💬 Reply to a comment
router.post("/:id/reply", isLoggedIn, replyToComment);

// ❤️ Like or unlike a comment
router.patch("/:id/like", isLoggedIn, likeOrUnlikeComment);

export default router;