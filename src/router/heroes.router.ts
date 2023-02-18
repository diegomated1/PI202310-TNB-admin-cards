import { Router } from "express";
import HeroesController from "../controllers/heroes.controllers";

class HeroesRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //Metodos de Santiago M
        this.router.route('/heroes').post(HeroesController.insertHeroes);
    }

}

export default new HeroesRouter();