import express from "express";

import {
  createUser,
  userList,
  updateUser,
} from "../controllers/user.controller.js";
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
    handler: [authUser, authAdmin, userList],
  },
  {
    method: "patch",
    path: "/user/:id",
    handler: [authUser, authAdmin, updateUser],
  },
];

routesObject.forEach(({ method, path, handler }) => {
  router[method](path, handler);
});

export default router;
