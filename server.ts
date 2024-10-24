import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDb from "./src/config/db";
import ENV from "./src/utils/env";
import auth from "./src/routes/route";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

const port =  ENV.PORT ? ENV.PORT : 8000;

// Routes\tobe
app.use("/", auth);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDb();
});
