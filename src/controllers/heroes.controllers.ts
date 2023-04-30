import { Request, Response, NextFunction } from 'express';
import HeroesModel from '../models/heroes.model';
import ui from 'uniqid';
import path from 'path';
import fs from 'fs';
import IHero from 'interfaces/IHero';

const insertHeroes = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const card_info = req.body;
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

const getHeroeImage = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {id_hero} = req.params;
        var route = path.join(__dirname, `../../uploads/card_images/${id_hero}.jpg`);
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
  getHeroeImage,
  getById,
  modifyHeroesById,
  getAll
}