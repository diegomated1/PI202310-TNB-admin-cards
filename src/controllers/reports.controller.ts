import { Request, Response, NextFunction } from 'express';
import ReportsModel from '../models/reports.model.js';
import ui from 'uniqid';

const insertReport = async (req:Request, res:Response, next: NextFunction)=>{
  try{
      const report_info = req.body;
      const report = new ReportsModel({...report_info, _id: ui.process(), created_date: Date.now()});
      await report.save();
      res.status(200).json({error: 0, status: true, message: 'reporte creado'});
  }catch(error){
      console.log(error)
      res.status(500).json({error: 0, status: false, message: 'Server internal error.'});
  }
}

const getAll = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const report = await ReportsModel.find();
        res.status(200).json({error: 0, status: true, data: report});
    }catch(error){
        console.log(error)
        res.status(500).json({error: 0, status: false, message: 'Server internal error.'});
    }
}

const getById = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {id_report} = req.params;
        const report = await ReportsModel.findById(id_report);
        if(report){
            res.status(200).json({error: 0, status: true, data: report});
        }else{
            res.status(404).json({error: 0, status: true, message: 'Report not found.'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 0, status: false, message: 'Server internal error.'});
    }
}

export default {
    insertReport,
    getAll,
    getById
}