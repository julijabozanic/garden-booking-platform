import express from 'express'
import { RequestController } from '../controllers/request.controller';

const requestRouter = express.Router()

requestRouter.route("/registerRequest").post(
    (req,res)=>new RequestController().registerRequest(req,res)
)
requestRouter.route("/getAllRequestUsers").get(
    (req,res)=>new RequestController().getAllRequestUsers(req,res)
)
requestRouter.route("/deleteUser").post(
    (req,res)=>new RequestController().deleteUser(req,res)
)

export default requestRouter;