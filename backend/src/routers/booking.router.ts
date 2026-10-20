import express from 'express'
import { BookingController } from '../controllers/booking.controller';

const bookingRouter = express.Router()

bookingRouter.route("/addBooking").post(
    (req,res)=>new BookingController().addBooking(req,res)
)
bookingRouter.route("/getAllBookings").get(
    (req,res)=>new BookingController().getAllBookings(req,res)
)
bookingRouter.route("/acceptBooking").post(
    (req,res)=>new BookingController().acceptBooking(req,res)
)
bookingRouter.route("/doneBooking").post(
    (req,res)=>new BookingController().doneBooking(req,res)
)
bookingRouter.route("/deleteDecorator").post(
    (req,res)=>new BookingController().deleteDecorator(req,res)
)
bookingRouter.route("/acceptMaintenance").post(
    (req,res)=>new BookingController().acceptMaintenance(req,res)
)
bookingRouter.route("/setDateTime").post(
    (req,res)=>new BookingController().setDateTime(req,res)
)



export default bookingRouter;