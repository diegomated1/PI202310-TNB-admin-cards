import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cardsRouter from './router/cards.router.js';
import cors from 'cors';
import heroesRouter from './router/heroes.router';
import reportsRouter from './router/reports.router.js';
import mongoDb from './database/mongo.db.js';

class Server{

    private app: express.Express
    
    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.start();
    }

    private config(){
        dotenv.config();
        new mongoDb().connect();
        this.app.use(cors({
            origin: process.env.CLIENT_HOST! || '*',
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    private routes(){
        this.app.use('/cards', cardsRouter.router);
        this.app.use('/cards', heroesRouter.router);
        this.app.use('/cards', reportsRouter.router);
    }

    private start(){
        this.app.listen(parseInt(process.env.API_PORT!), process.env.API_HOST!, ()=>{
            console.log(`Listen on http://${process.env.API_HOST}:${process.env.API_PORT}/`);
        });
    }
}

new Server();