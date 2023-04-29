import mongoose from 'mongoose';

const HeroesModel = mongoose.model('heroesCards', new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    life: Number,
    def: Number,
    atq: {
        base: Number,
        range: Number,
    },
    dmg: {
        base: Number,
        range: Number
    },
    power: Number
}));

export default HeroesModel;