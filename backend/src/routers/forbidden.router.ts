import express from 'express'
import { ForbiddenController } from '../controllers/forbidden.controller';

const forbiddenRouter = express.Router()

forbiddenRouter.route("/getForbiddenByUsername/:username").get(
    (req,res)=>new ForbiddenController().getForbiddenByUsername(req,res)
)

forbiddenRouter.route("/getForbiddenByEmail/:email").get(
    (req,res)=>new ForbiddenController().getForbiddenByEmail(req,res)
)
forbiddenRouter.route("/addForbidden").post(
    (req,res)=>new ForbiddenController().addForbidden(req,res)
)



export default forbiddenRouter;