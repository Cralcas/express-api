import express, { urlencoded, json } from "express";
import { router } from "./routes/apiRoutes";
import cors from "cors";
import { notFound } from "./middleware/not-found";
import { error } from "./middleware/error";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(urlencoded({ extended: true }));

app.use(json());

app.use("/api", router);

app.use(notFound);
app.use(error);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
