import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const HeroesModel = db.model('heroesCards', new mongoose.Schema({
    _id: String,
    name: String,
    power: Number,
    health: Number,
    defense: Number,
    attack_basic: Number,
    attack_range: Number,
    damage_range: Number,
    image: String
}));

export default HeroesModel;