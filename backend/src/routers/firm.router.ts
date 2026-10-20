import express from 'express'
import { FirmController } from '../controllers/firm.controller'

const firmRouter = express.Router()

firmRouter.route("/getAllFirms").get(
    (req,res)=>new FirmController().getAllFirms(req,res)
)
firmRouter.route("/registerFirm").post(
    (req,res)=>new FirmController().registerFirm(req,res)
)
firmRouter.route("/getFirmByName/:name").get(
    (req,res)=>new FirmController().getFirmByName(req,res)
)

export default firmRouter;