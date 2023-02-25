import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/heroes.model';
import ui from 'uniqid';

const insertHeroes = async (req:Request, res:Response, next: NextFunction)=>{
  try{
      const card_info = req.body;
      const card = new CardModel({...card_info, _id: ui.process()});
      await card.save();
      res.status(200).json({error:0,status: true, message:'creado correctamente'});
  }catch(error){
      console.log(error)
      res.status(500).json({error:1,status: false, message:'no se pudo crear'});
  }
}

export default {
  insertHeroes,
}