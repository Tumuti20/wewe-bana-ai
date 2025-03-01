import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

// Address routes
router.route("/address").post(protect, addUserAddress);
router
  .route("/address/:id")
  .put(protect, updateUserAddress)
  .delete(protect, deleteUserAddress);

// Wishlist routes
router
  .route("/wishlist")
  .post(protect, addToWishlist)
  .get(protect, getWishlist);
router.route("/wishlist/:id").delete(protect, removeFromWishlist);

export default router;
