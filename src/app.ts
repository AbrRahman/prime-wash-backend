import express, { RequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundHandler from "./app/middleware/notFoundHandler";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

// routing
app.use("/api/v1", router);

// not found handler
app.use(notFoundHandler);

// default error handler
app.use(globalErrorHandler);

export default app;
