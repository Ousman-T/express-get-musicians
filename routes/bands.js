const express = require('express');
const bandRouter = express.Router();
const {Band, Musician} = require('../models/index');

// TODO: GET BANDS - INCLUDE MUSICIANS

bandRouter.get('/', async (req, res) => {
    try{
        const foundBand = await Band.findAll({include: Musician});
        if(foundBand){
            res.json(foundBand);
        }else{
            res.status(404).json({message:"Can not find band!"});
        }
    }catch(error){
        res.status(500).json({message:'Error retrieving band', error:error.message});
    }
});

// TODO: GET ONE BAND
bandRouter.get('/:id', async (req, res) => {
    try{
        locatedBand = await Band.findByPk(req.params.id, {include: Musician});
        if(locatedBand){
            res.json(locatedBand);
        }else{
            res.status(404).json({message:'Can not find band!'})
        }
    }catch(error){
        res.status(500).json({message:"error retrieving band", error:error.message});
    }
});

module.exports = bandRouter;