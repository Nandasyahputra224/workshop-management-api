import express from "express";

import { createUser, showUsers } from "../controllers/user.controller.js";
import { authUser, authAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
const routesObject = [
  {
    method: "post",
    path: "/create",
    handler: [authUser, authAdmin, createUser],
  },
  {
    method: "get",
    path: "/users",
    handler: showUsers,
  },
];

routesObject.forEach(({ method, path, handler }) => {
  router[method](path, handler);
});

export default router;
