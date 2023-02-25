import { Router } from "express";
import reportsController from "../controllers/reports.controller.js";
import upload from "../middlewares/image.save.js";

class ReportRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/reports').post(reportsController.insertReport);
        this.router.route('/reports').get(reportsController.getAll);
        this.router.route('/reports/:id_report').get(reportsController.getById);
    }

}

export default new ReportRouter();


