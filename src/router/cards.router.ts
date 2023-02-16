import { Router } from "express";
import cardsController from "../controllers/cards.controller.js";

class CardRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/cards').post(cardsController.insertCards);
        this.router.route('/cards').get(cardsController.getAllCards);
        this.router.route('/cards/:id_card').get(cardsController.getCardsById);
    }

}

export default new CardRouter();


