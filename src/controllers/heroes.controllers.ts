import { Request, Response, NextFunction } from 'express';
import CardModel from '../models/heroes.model';
import ui from 'uniqid';
import path from 'path';
import fs from 'fs';

const insertHeroes = async (req:Request, res:Response, next: NextFunction)=>{
  try{
      const card_info = req.body;
      if(req.file){
        var id_heroes = path.parse(req.file.filename).name;
    }else{
        var id_heroes = ui.process();
    }
      const card = new CardModel({...card_info, _id: id_heroes});
      await card.save();
      res.status(200).json({error:0,status: true, message:'creado correctamente'});
  }catch(error){
      console.log(error)
      res.status(500).json({error:1,status: false, message:'no se pudo crear'});
  }
}

const getHeroeImage = async (req:Request, res:Response, next: NextFunction)=>{
  try{
    const {id_heroes} = req.params;
    var route = path.join(__dirname, `../../uploads/hero_images/${id_heroes}.jpg`);
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
  insertHeroes,
  getHeroeImage
}