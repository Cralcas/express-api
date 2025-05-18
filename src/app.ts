import express, { urlencoded, json } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { router } from "./routes/apiRoutes.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { error, notFound } from "./middleware/index.js";

const app = express();

app.set("trust proxy", 1);

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
const swaggerDocument = YAML.load("./docs/swagger.yaml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(notFound);
app.use(error);

export default app;
