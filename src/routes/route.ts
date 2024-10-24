import express from "express";
import {
  register,
  login,
  protect
} from "../controllers/auth";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post('/protect', requireAuth, protect)

export default router;
