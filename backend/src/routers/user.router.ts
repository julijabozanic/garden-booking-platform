import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route("/register").post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route("/addToFavourites").post(
    (req,res)=>new UserController().addToFavourites(req,res)
)

userRouter.route("/getUserByUsername/:username").get(
    (req,res)=>new UserController().getUserByUsername(req,res)
)

userRouter.route("/getUserByEmail/:email").get(
    (req,res)=>new UserController().getUserByEmail(req,res)
)

userRouter.route("/changeFavourite").post(
    (req,res)=>new UserController().changeFavourite(req,res)
)
userRouter.route("/updatePassword").post(
    (req,res)=>new UserController().updatePassword(req,res)
)
userRouter.route("/updateFreeToFalse").post(
    (req,res)=>new UserController().updateFreeToFalse(req,res)
)
userRouter.route("/updateUser").post(
    (req,res)=>new UserController().updateUser(req,res)
)
userRouter.route("/getAllUsers").get(
    (req,res)=>new UserController().getAllUsers(req,res)
)
userRouter.route("/updateActivated").post(
    (req,res)=>new UserController().updateActivated(req,res)
)
userRouter.route("/addFirmToUser").post(
    (req,res)=>new UserController().addFirmToUser(req,res)
)


export default userRouter;