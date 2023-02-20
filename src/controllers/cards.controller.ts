import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/cards.model.js';
import ui from 'uniqid';

const insertCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const card_info = req.body;
        const card = new CardModel({ ...card_info, _id: ui.process() });
        await card.save();
        res.status(200).json({ status: true });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: false });
    }
}

const getAllCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const card = await CardModel.find();
        res.status(200).json({ status: true, data: card });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

const getCardsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_card } = req.params;
        const card = await CardModel.findById(id_card);
        res.status(200).json({ status: true, data: card });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

const modifyCardsById = async (req: Request, res: Response, next: NextFunction) => {
    let params = req.params;
    const card = await CardModel.findById(params.id_card);
    if (card == null) {
        res.status(404).json({ info: 'carta no existe' })
    } else {
        try {
            let body = req.body;
            await card.update({
                $set: {
                    name: body.name,
                    description: body.description,
                    id_hero: body.id_hero,
                    image: body.image,
                    card_type: body.card_type,
                    effects: body.effects
                }
            });
            res.status(200).json({status:true, info: 'Se actualizo la carta con exito'})
        } catch {
            res.status(500).json({ status: false, info: 'no se actualizo la carta' })
        }
    }
}

export default {
    insertCards,
    getAllCards,
    getCardsById,
    modifyCardsById
}