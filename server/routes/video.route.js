import express from "express";
import multer from "multer";
import storage from "../config/multerStorage.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

// 🎬 Import Controllers
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementVideoViewCount,
  toggleVideoLike,
  toggleSavedVideo,
  getCreatorVideos,
  getTopVideos
} from "../controllers/video.controller.js";

const upload = multer({ storage });
const router = express.Router();

// ➕ Upload new video
router.post(
  "/",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),

  isLoggedIn,
  uploadVideo
);

// 📜 Get all videos (with optional search, filters, pagination)
router.get("/", getAllVideos);

router.get("/top", getTopVideos);

// 🔍 Get single video by ID
router.get("/:id", getVideoById);

// ✏️ Update video (title, desc, category, video, thumbnail)
router.put(
  "/:id",
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  isLoggedIn,
  updateVideo
);

// 🗑️ Delete a video
router.delete("/:id", isLoggedIn, deleteVideo);

// 👁️ Increment video views (only once per user)
router.post("/:id/view", isLoggedIn, incrementVideoViewCount);

// ❤️ Like / Unlike a video
router.post("/:id/like", isLoggedIn, toggleVideoLike);

// 🔖 Save / Unsave Video (toggle)
router.put("/saved/:videoId", isLoggedIn, toggleSavedVideo);

// 🎞️ Get all videos of the logged-in creator
router.get("/creator/videos", isLoggedIn, getCreatorVideos);



export default router;