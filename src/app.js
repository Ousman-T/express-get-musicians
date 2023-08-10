const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { Band } = require('../models/index');
const { db } = require("../db/connection");


const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get('/musicians', async (req, res) => {
    const musicians = await Musician.findAll({});
    res.json(musicians);
});

app.get('/musicians/:id', async (req, res) => {
    const musicianId = req.params.id;
    try {
        const foundMusician = await Musician.findByPk(musicianId);
        if(foundMusician){
            res.json(foundMusician);
        }else{
            res.status(404).json({message:"Musician not found"});
        }
    }catch(error){
        res.status(500).json({message:'Error retrieving musician', error: error.message});
    }
});







module.exports = app;