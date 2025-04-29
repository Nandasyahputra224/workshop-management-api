import express from "express";
import { login, user, logout } from "../controllers/authController.js";
import { authUser } from "../middleware/authenticated.js";
import { addUser, showUsers } from "../controllers/userContoller.js";

const router = express.Router();
const routesObject = [
  { method: "post", path: "/login", handler: login },
  { method: "post", path: "/add", handler: addUser },
  { method: "get", path: "/users", handler: showUsers },
  { method: "get", path: "/me", handler: [authUser, user] },
  { method: "post", path: "/logout", handler: logout },
];

routesObject.forEach(({ method, path, handler }) => {
  router[method](path, handler);
});

export default router;
