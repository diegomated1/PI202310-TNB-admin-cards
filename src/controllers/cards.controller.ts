import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/cards.model.js';
import ui from 'uniqid';
import path from 'path';
import fs from 'fs';

const insertCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const card_info = req.body;
        if(req.file){
            var id_card = path.parse(req.file.filename).name;
        }else{
            var id_card = ui.process();
        }
        const card = new CardModel({...card_info, _id: id_card});
        await card.save();
        res.status(200).json({status: true});
    }catch(error){
        console.log(error);
        res.status(500).json({status: false});
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
        if(card){
            res.status(200).json({ status: true, data: card });
        }else{
            res.status(404).json({ status: true, message: 'card not found' });
        }
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

const getCardImage = async (req:Request, res:Response, next: NextFunction)=>{
    
    try{
        const {id_card} = req.params;
        var route = path.join(__dirname, `../../uploads/card_images/${id_card}.jpg`);
        fs.open(route, 'r', (err, df)=>{
            if(err) res.status(404).json({error: 0, message: "Image not found"});
            else{
                res.sendFile(route);
            }
        });
    }catch(error){
        res.status(500).json({error: 1, status: false});
    }
} 

export default {
    insertCards,
    getAllCards,
    getCardsById,
    getCardImage,
    modifyCardsById
}