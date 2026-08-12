import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudyCopilot backend is running 🚀",
  });
});

export default app;