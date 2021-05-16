require("dotenv").config({ path: "../../variables.env" });
const express = require("express");
const routes = express.Router({
  mergeParams: true,
});
const { getAll, create, deleteAll, search, getSortedData, getPaginatedData } = require("./handlers");
routes.get("/", getAll);
routes.get("/:order/:filter", getSortedData);
routes.get("/paginate/:offSet/:limit", getPaginatedData);

routes.post("/add", create);
routes.post("/search", search);
routes.delete("/", deleteAll);
module.exports = {
  routes,
};
