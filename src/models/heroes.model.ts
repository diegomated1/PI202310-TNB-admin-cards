import mongoose from 'mongoose';

const HeroesModel = mongoose.model('heroesCards', new mongoose.Schema({
    _id: String,
    name: String,
    power: Number,
    health: Number,
    defense: Number,
    attack_basic: Number,
    attack_range: Number,
    damage_range: Number,
    description: String,
    image: String
}));

export default HeroesModel;