import mongoose from 'mongoose';

const ReportsModel = mongoose.model('reports', new mongoose.Schema({
    _id: String,
    post: String,
    description: String,
    created_date: Date
}));

export default ReportsModel;