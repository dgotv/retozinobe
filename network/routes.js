const express = require("express");
const user = require("../components/user/network");
const admin = require("../components/admin/network");

const routes = function (server) {
  server.use("/", user);
  server.use("/admin", admin);
};

module.exports = routes;
