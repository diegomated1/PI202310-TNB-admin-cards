import { Router } from "express";
import HeroesController from "../controllers/heroes.controllers";
import upload from "../middlewares/image.save.js";

class HeroesRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //Metodos de Santiago M
        //this.router.route('/heroes').post(HeroesController.insertHeroes);
        this.router.route('/images/Heroes/:id_heroes').get(HeroesController.getHeroeImage);
        this.router.route('/heroes').post(upload.single('card_image'), HeroesController.insertHeroes);
    }

}

export default new HeroesRouter();