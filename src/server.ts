import express from "express";
import { router } from "./routes/apiRoutes";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
