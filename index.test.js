// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    it('gives status 200', async () => {
        const response = await request(app).get('/musicians');
        const responseData = JSON.parse(response.text);
        // console.log(responseData);
        expect(response.statusCode).toBe(200);
    }),
    it('Contains correct properties', async () => {
        const response = await request(app).get('/musicians');
        const responseData2 = JSON.parse(response.text);
        // console.log(responseData2);
        expect(response.body[0].name).toBe('Mick Jagger');
    }),
    xit('goes to correct artist', async (req,res) => {
        const response = await request(app).get('/musicians/:id');
        console.log(response.body);
        const musicianId = req.params.id;
        const foundMusician = await Musician.findByPk(musicianId);
        if(foundMusician){
            res.json(foundMusician);
        }else{
            res.status(404).json({message:"No artist at endpoint"});
        };
        expect(foundMusician.body.name).toBe('Drake');
        expect(foundMusician.statusCode).toBe(200);
    }),
    it('Can create a User', async () => {
        const userData = {
            name:"Vince Staples",
            instrument:"Drums"
        };
        const response = await request(app).post('/musicians').send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toEqual(userData.username);
    }),
    it('Can find a bands', async (req, res) => {
        const response = await request(app).get('/bands/:id');
        const foundBands = await Band.findByPk(req.params.id);
        if(foundBands){
            res.json(foundBands)
        }else{
            res.status(404).json({message:'Can not find band'});
        }
        expect(foundBands).toBeTruthy();
    }),
    it('should return errors array', async (req, res) => {
        const response = await response(app).post('/restaurants').send({name:'hi'});
        expect(response.body).toHaveProperty('errors');
        expect(Array.isArray(response.body.errors)).toBe(true);
    }),
    it('should return errors array', async (req, res) => {
        const response = await response(app).post('/restaurants').send({name:'l'});
        expect(response.body).toHaveProperty('errors');
        expect(Array.isArray(response.body.errors)).toBe(true);
    })

    
    




    
})