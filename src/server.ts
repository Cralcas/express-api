import express from "express";
import { router } from "./routes/apiRoutes";

const app = express();
const PORT = 8000;

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
