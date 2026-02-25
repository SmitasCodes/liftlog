import "dotenv/config";
import "./config/env.ts";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorMiddleware.ts";
import usersRoutes from "./routes/usersRoutes.ts";
import templatesRoutes from "./routes/templatesRoutes.ts";
import exercisesRoutes from "./routes/exercisesRoutes.ts";
import templatesExercisesRoutes from "./routes/templatesExercisesRoutes.ts";
import sessionsRoutes from "./routes/sessionsRoutes.ts";

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/exercises", exercisesRoutes);
app.use("/api/templatesExercises", templatesExercisesRoutes);
app.use("/api/sessions", sessionsRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is now running on port: ${port}`);
});
