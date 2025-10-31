import axios from "axios";
import { API_BASE_URL } from "../../redux/apiUrl";

const api = axios.create({
  baseURL: `${API_BASE_URL}/comments`,
  withCredentials: true,
});

// 💬 Add a comment
export const addCommentAPI = (videoId, text) =>
  api.post(`/${videoId}/comment`, { text });

// 💭 Get all comments for a video
export const getVideoCommentsAPI = (videoId) =>
  api.get(`/${videoId}/comments`);

// ✏️ Update comment
export const updateCommentAPI = (commentId, text) =>
  api.patch(`/${commentId}`, { text });

// 🗑️ Delete comment
export const deleteCommentAPI = (commentId) =>
  api.delete(`/${commentId}`);

// 💬 Reply to a comment
export const replyToCommentAPI = (commentId, text) =>
  api.post(`/${commentId}/reply`, { text });

// ❤️ Like or unlike a comment
export const likeOrUnlikeCommentAPI = (commentId) =>
  api.patch(`/${commentId}/like`);