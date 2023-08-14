const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { Band } = require('../models/index');
const { db } = require("../db/connection");
const musicianRouter = require('../routes/musicians.js');


const port = 3000;
app.use(express.json());
app.use(express.urlencoded());
app.use('/musicians', musicianRouter);











module.exports = app;