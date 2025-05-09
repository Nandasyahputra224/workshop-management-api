import express from "express";

import {
  createUser,
  userList,
  updateUser,
  userDetail,
  deleteUser,
} from "../controllers/user.controller.js";
import { authUser, authAdmin } from "../middlewares/auth.middleware.js";

const routes = express.Router();
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
    method: "get",
    path: "/users/:id",
    handler: [authUser, authAdmin, userDetail],
  },
  {
    method: "patch",
    path: "/users/:id",
    handler: [authUser, authAdmin, updateUser],
  },
  {
    method: "delete",
    path: "/users/:id",
    handler: [authUser, authAdmin, deleteUser],
  },
];

routesObject.forEach(({ method, path, handler }) => {
  routes[method](path, handler);
});

export default routes;
