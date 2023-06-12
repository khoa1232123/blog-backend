import express from "express";
import { getAllUser, login, signup } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter;
