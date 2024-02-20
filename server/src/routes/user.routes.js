import express from "express";
import {
  // UpdatePassword,
  // confirmEmail,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import {verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

// router.post("/updatepassword", UpdatePassword);

router.get("/", getAllUser);
router.get("/:id",[verifyToken], getUserById);
router.put("/:id",[verifyToken], updateUser);
router.delete("/:id", [verifyToken], deleteUser);

// router.put("/confirmemail/:id", confirmEmail);


export default router;
