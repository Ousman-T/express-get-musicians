const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { Band } = require('../models/index');
const { db } = require("../db/connection");


const port = 3000;
app.use(express.json());
app.use(express.urlencoded());

//TODO: Create a GET /musicians route to return all musicians 

app.get('/musicians', async (req, res) => {
    const musicians = await Musician.findAll({});
    res.json(musicians);
});

// TODO: READ BY 1
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

//TODO: CREATE MUSICIAN
app.post('/musicians', async (req, res, next) => {
    try{
        const user = await Musician.create(req.body);
        if(!user){
            throw new Error('No user created!');
        }
        res.send(user.username);
    }catch(error){
        next(error);
    }
});

// TODO: UPDATE/PUT MUSICIAN
app.put('/:musician', async (req, res, next) => {
    try{
        const updated = await Musician.update(req.body, {where:{name:req.params.body.name}});
        console.log(updated);
        if(updated[0] === 0){
            throw new Error('No update made!');
        }
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
});

//! Todo: DELETE/DESTROY MUSICIAN
app.delete('/:musician', async (req, res, next) => {
    try{
        const deleted = await Musician.destroy({where:{name: req.params.body.name}});
        if(deleted === 0){
            throw new Error('No musician deleted!')
        }
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
})









module.exports = app;