import { Request, Response, NextFunction } from 'express';
import HeroesModel from '../models/heroes.model';
import ui from 'uniqid';
import path from 'path';

const insertHeroes = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const card_info = req.body;

        if(typeof(card_info.atq)=='string'){
            card_info.atq = JSON.parse(card_info.atq);
        }
        if(typeof(card_info.dmg)=='string'){
            card_info.dmg = JSON.parse(card_info.dmg);
        }

        if(req.file){
            var id_hero = path.parse(req.file.filename).name;
        }else{
            var id_hero = ui.process();
        }
        const card = new HeroesModel({...card_info, _id: id_hero});
        await card.save();
        res.status(200).json({error:0,status: true, message:'creado correctamente'});
    }catch(error){
        console.log(error)
        res.status(500).json({error:1,status: false, message:'no se pudo crear'});
    }
}

const getById = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {id_hero} = req.params;
        const hero = await HeroesModel.findById(id_hero);
        if(hero){
            res.status(200).json({error: 0, status: true, data: hero});
        }else{
            res.status(404).json({error: 0, status: true, message: 'Hero not found.'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 0, status: false, message: 'Server internal error.'});
    }
}

const getAll = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const heroes = await HeroesModel.find();
        res.status(200).json({error: 0, status: true, data: heroes});
    }catch(error){
        console.log(error)
        res.status(500).json({error: 0, status: false, message: 'Server internal error.'});
    }
}

const modifyHeroesById = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id_hero} = req.params;
        const body = req.body;
        const hero = await HeroesModel.findById(id_hero);
        if (!hero) {
            return res.status(404).json({ status: true, info: 'Hero not found' })
        }

        hero.name = body.name || hero.name;
        hero.description = body.description || hero.description;
        hero.life = body.life || hero.life;
        hero.atq = {    
            base: hero.atq?.base || body.atq.base,
            range: hero.atq?.range || body.atq.range
        };
        hero.dmg = {    
            base: hero.dmg?.base || body.dmg.base,
            range: hero.dmg?.range || body.dmg.range
        };
        hero.power = body.power || hero.power;
        hero.def = body.def || hero.def;
        hero.name = body.name || hero.name;
        hero.name = body.name || hero.name;

        await hero.save();

        res.status(200).json({status:true, info: 'Se actualizo heroe con exito'});
    } catch {
        res.status(200).json({status:true, info: 'Se actualizo heroe con exito'})
    }
}


export default {
  insertHeroes,
  getById,
  modifyHeroesById,
  getAll
}