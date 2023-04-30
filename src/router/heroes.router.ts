import { Router } from "express";
import heroesControllers from "../controllers/heroes.controllers";
import HeroesController from "../controllers/heroes.controllers";
import upload from "../middlewares/image.save.js";

class HeroesRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/images/Heroes/:id_hero').get(HeroesController.getHeroeImage);
        this.router.route('/heroes').post(upload.single('card_image'), HeroesController.insertHeroes);
        this.router.route('/heroes').get(heroesControllers.getAll);
        this.router.route('/heroes/:id_hero').get(heroesControllers.getById);
        this.router.route('/heroes/:id_hero').put(heroesControllers.modifyHeroesById);
    }

}

export default new HeroesRouter();