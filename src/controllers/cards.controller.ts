import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/cards.model.js';
import ui from 'uniqid';

const insertCards = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {name, description} = req.body;
        const card = new CardModel({_id: ui.time(), name: name, description: description});
        await card.save();
        res.status(200).json({status: true});
    }catch(error){
        res.status(400).json({status: false});
    }
}

const getAllCards = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const card = await CardModel.find();
        console.log(card);
        res.status(200).json({status: true, data: card});
    }catch(error){
        console.log(error)
        res.status(400).json({status: false});
    }
}

const getCardsById = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {id_card} = req.params;
        const card = await CardModel.findById(id_card);
        res.status(200).json({status: true, data: card});
    }catch(error){
        res.status(400).json({status: false});
    }
}

export default {
    insertCards,
    getAllCards,
    getCardsById
}