import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too many request, try again later",
});

export default rateLimiter;
