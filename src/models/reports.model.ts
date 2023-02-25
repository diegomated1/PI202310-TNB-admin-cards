import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const ReportsModel = db.model('reports', new mongoose.Schema({
    _id: String,
    post: String,
    description: String,
    created_date: Date
}));

export default ReportsModel;