import express, { RequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/route";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

// routing
app.use(router);

// not found handler
app.use((req, res, next) => {
  res.send("Page notFound");
});

// default error handler
// app.use((err,req,res,next)=>{
//    res.send("Error handler")
// })

export default app;
