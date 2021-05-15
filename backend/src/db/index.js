require("dotenv").config({ path: "../../variables.env" });
const express = require("express");
const routes = express.Router({
  mergeParams: true,
});
const { getAll, create, deleteAll } = require("./handlers");
routes.get("/", getAll);
routes.post("/", create);
routes.delete("/", deleteAll);
module.exports = {
  routes,
};
