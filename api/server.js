const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile.js");

const server = express();

const db = knex(knexConfig.development);

server.use(express.json());

module.exports = server;
