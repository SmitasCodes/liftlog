import "dotenv/config";
import { prisma } from "./lib/prisma";
import cors from "cors";
import express from "express";

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is now running on port: ${port}`);
});
