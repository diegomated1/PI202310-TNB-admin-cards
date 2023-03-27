import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const CardModel = db.model('cards', new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    id_hero: String,
    image: String,
    card_type: String,
    effects: [String]
}));

export default CardModel;