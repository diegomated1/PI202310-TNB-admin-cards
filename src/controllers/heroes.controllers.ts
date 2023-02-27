import { Request, Response, NextFunction } from 'express';
import HeroesModel from '../models/heroes.model';
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
      const card = new HeroesModel({...card_info, _id: id_heroes});
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


const getById = async (req:Request, res:Response, next: NextFunction)=>{
  try{
      const {id_heroes} = req.params;
      const hero = await HeroesModel.findById(id_heroes);
      if(hero){
          res.status(200).json({error: 0, status: true, data: hero});
      }else{
          res.status(404).json({error: 0, status: true, message: 'Report not found.'});
      }
  }catch(error){
      console.log(error)
      res.status(500).json({error: 0, status: false, message: 'Server internal error.'});
  }
}

const modifyHeroesById = async (req: Request, res: Response, next: NextFunction) => {
  let params = req.params;
  const hero = await HeroesModel.findById(params.id_heroes);
  if (hero == null) {
      res.status(404).json({ info: 'heroe no existe' })
  } else {
      try {
          let body = req.body;
          await hero.update({
              $set: {
                  name: body.name,
                  power: body.power,
                  health: body.health,
                  defense: body.defense,
                  attack_basic: body.attack_basic,
                  attack_range: body.attack_range,
                  damage_range: body.damage_range,
                  description: body.description
               
              }
          });
          
          res.status(200).json({status:true, info: 'Se actualizo heroe con exito'})
      } catch {
          res.status(500).json({ status: false, info: 'no se actualizo heroe' })
      }
  }
}
export default {
  insertHeroes,
  getHeroeImage,
  getById,
  modifyHeroesById

}