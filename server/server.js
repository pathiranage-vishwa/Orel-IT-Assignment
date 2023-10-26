dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";



const app = express();


// Enable security headers using helmet middleware
app.use(helmet());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

//*** Define Routes Here ***/



//User Routes
import userRouter from "./routes/userRoute.js";
app.use("/auth", userRouter);

//server run in this port 8070
const PORT = process.env.PORT || 8070;

//Connect data base
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});