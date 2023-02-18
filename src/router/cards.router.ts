import { Router } from "express";
import cardsController from "../controllers/cards.controller.js";
import cardsHeroesController from "../controllers/heroes.cards.controllers";

class CardRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        //Metodos de Diego C.
        this.router.route('/cards').post(cardsController.insertCards); 
        this.router.route('/cards').get(cardsController.getAllCards);
        this.router.route('/cards/:id_card').get(cardsController.getCardsById);

        //Metodos de Santiago M
        this.router.route('/cards/heroes').post(cardsHeroesController.insertHeroesCards);
    }

}

export default new CardRouter();


