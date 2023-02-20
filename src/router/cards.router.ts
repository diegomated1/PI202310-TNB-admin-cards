import { Router } from "express";
import cardsController from "../controllers/cards.controller.js";

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
        this.router.route('/cards/:id_card').put(cardsController.modifyCardsById);
    }

}

export default new CardRouter();


