// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    it('gives status 200', async () => {
        const response = await request(app).get('/musicians');
        const responseData = JSON.parse(response.text);
        console.log(responseData);
        expect(response.statusCode).toBe(200);
    }),
    it('Contains correct properties', async () => {
        const response = await request(app).get('/musicians');
        const responseData2 = JSON.parse(response.text);
        console.log(responseData2);
        expect(response.body[0].name).toBe('Mick Jagger');
    })

    
    




    
})