import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/heroes.cards.model';
import ui from 'uniqid';

const insertHeroesCards = async (req:Request, res:Response, next: NextFunction)=>{
  try{
      const card_info = req.body;
      const card = new CardModel({...card_info, _id: ui.process()});
      await card.save();
      res.status(200).json({status: true});
  }catch(error){
      console.log(error)
      res.status(500).json({status: false});
  }
}

export default {
  insertHeroesCards,
}