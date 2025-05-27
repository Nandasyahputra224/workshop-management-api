import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./src/routes/route.js";
import authRouter from "./src/routes/auth.js";

const app = express();

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

dotenv.config();
app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);
app.use("/auth", authRouter);

const port = process.env.APP_PORT || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`server running port ${port}`);
});
