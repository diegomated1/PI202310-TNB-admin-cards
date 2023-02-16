import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
//import userR from './router/user.route.js';
import cardsRouter from './router/cards.router.js';

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
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    private routes(){
        this.app.use(cardsRouter.router);
    }

    private start(){
        this.app.listen(parseInt(process.env.API_PORT!), process.env.API_HOST!, ()=>{
            console.log(`Listen on http://${process.env.API_HOST}:${process.env.API_PORT}/`);
        });
    }
}

new Server();