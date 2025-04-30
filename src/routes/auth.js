import express from "express";

import { login, user, logout } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();
const routesObject = [
  {
    method: "post",
    path: "/login",
    handler: login,
  },
  {
    method: "get",
    path: "/profile",
    handler: [authUser, user],
  },
  {
    method: "post",
    path: "/logout",
    handler: logout,
  },
];

routesObject.forEach(({ method, path, handler }) => {
  authRouter[method](path, handler);
});

export default authRouter;
