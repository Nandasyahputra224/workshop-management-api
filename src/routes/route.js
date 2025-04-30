import express from "express";

import { addUser, showUsers } from "../controllers/user.controller.js";

const router = express.Router();
const routesObject = [
  {
    method: "post",
    path: "/add",
    handler: addUser,
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
