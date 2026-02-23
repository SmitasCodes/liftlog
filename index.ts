import "dotenv/config";
import "./config/env.ts";
import cors from "cors";
import express from "express";
import usersRoutes from "./routes/usersRoutes.ts";

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);

app.listen(port, () => {
  console.log(`Server is now running on port: ${port}`);
});
