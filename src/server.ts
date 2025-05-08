import express, { urlencoded, json } from "express";
import { router } from "./routes/apiRoutes";
import cors from "cors";
import { notFound } from "./middleware/not-found";
import { error } from "./middleware/error";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(helmet());
app.use(urlencoded({ extended: true }));
app.use(json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use("/api", router);
app.use(notFound);
app.use(error);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
