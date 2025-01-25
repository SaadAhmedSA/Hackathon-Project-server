import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"
import connectDB from "./src/db/connection.js";
import cookieParser from "cookie-parser";
import authrouter from "./src/routes/auth.route.js";

const PORT = process.env.PORT || 3000

const app = express();
app.use((req, res, next) => {
  next();
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Hackathon App!");
});
 
app.use("/api/v1", authrouter)


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
