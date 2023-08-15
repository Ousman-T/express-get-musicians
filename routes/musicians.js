const express = require('express');
const musicianRouter = express.Router();
const {Musician} = require('../models/index');
const {check, validationResult} = require('express-validator');

//TODO: Create a GET /musicians route to return all musicians 

musicianRouter.get('/', async (req, res) => {
    const musicians = await Musician.findAll({});
    res.json(musicians);
});

// TODO: READ BY 1
musicianRouter.get('/:id', async (req, res) => {
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
musicianRouter.post('/', [check('name')
.not()
.isEmpty().trim(),
check('instrument').not().isEmpty().trim(),
check('name').isLength({min:2, max:20}).withMessage('Name must be between 2 and 20 characters'),
check('instrument').isLength({min:2, max:20}).withMessage('Instrument must be between 2 and 20 characters')],
async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.array()});
        }else{

            const user = await Musician.create(req.body);
            if(!user){
                throw new Error('No user created!');
            }
            res.send(user.username);
            // res.json(musicians);
        }
    }catch(error){
        next(error);
    }
});

// TODO: UPDATE/PUT MUSICIAN
musicianRouter.put('/:id',[check('name')
.not()
.isEmpty().trim(),
check('instrument').not().isEmpty().trim(),
check('name').isLength({min:2, max:20}).withMessage('Name must be between 2 and 20 characters'),
check('instrument').isLength({min:2, max:20}).withMessage('Instrument must be between 2 and 20 characters')], async (req, res, next) => {
    try{
        const updated = await Musician.update(req.body, {where:{id:req.params.id}});
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
musicianRouter.delete('/:id', async (req, res, next) => {
    try{
        const deleted = await Musician.destroy({where:{id:req.params.id}});
        if(deleted === 0){
            throw new Error('No musician deleted!')
        }
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
})

module.exports = musicianRouter;