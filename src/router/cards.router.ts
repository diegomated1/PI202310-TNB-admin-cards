import { Router } from "express";
import cardsController from "../controllers/cards.controller.js";
import upload from "../middlewares/image.save.js";

class CardRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/cards').post(upload.single('card_image'), cardsController.insertCards);
        this.router.route('/cards').get(cardsController.getAllCards);
        this.router.route('/cards/:id_card').get(cardsController.getCardsById);
        this.router.route('/cards/:id_card').put(upload.single('card_image'), cardsController.modifyCardsById);
        this.router.route('/images/:id_card').get(cardsController.getCardImage);
    }

}

export default new CardRouter();


