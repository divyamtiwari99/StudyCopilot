import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";
import { rateLimit } from "./middleware/rate-limit.middleware.js";

const app = express();
app.set("trust proxy", env.TRUST_PROXY);
app.disable("x-powered-by");

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: env.NODE_ENV === "production",
}));
app.use(compression());
app.use(cookieParser());

const developmentOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);
const productionOrigins = new Set(
  env.FRONTEND_URL ? [new URL(env.FRONTEND_URL).origin] : [],
);
const allowedOrigins = env.NODE_ENV === "production"
  ? productionOrigins
  : new Set([...developmentOrigins, ...productionOrigins]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
}));

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "256kb" }));
app.use("/api", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "StudyCopilot backend is running 🚀" });
});

app.get("/api/ready", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    success: ready,
    database: ready ? "connected" : "disconnected",
  });
});

app.use(
  "/api",
  rateLimit({ name: "api", windowMs: 60_000, max: env.API_RATE_LIMIT_PER_MINUTE }),
  routes,
);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
