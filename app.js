import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
mongoose
  .connect(
    "mongodb+srv://khoa1232123:khoa1232123@cluster0.h3fcjyi.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5005);
  })
  .then(() => {
    console.log("Connect db success");
  })
  .catch((err) => {
    console.log(err);
  });
