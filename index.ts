import "dotenv/config";
import "./config/env.ts";
import cors from "cors";
import express from "express";
//testing
import { createUser } from "./controllers/usersController.ts";
//

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// testing
app.post("/api/users", createUser);
//

app.listen(port, () => {
  console.log(`Server is now running on port: ${port}`);
});
