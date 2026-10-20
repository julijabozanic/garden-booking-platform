import express from 'express'
import { RejectedBookingController } from '../controllers/rejectedBooking.controller';

const rejectedBookingRouter = express.Router()

rejectedBookingRouter.route("/addRejectedBooking").post(
    (req,res)=>new RejectedBookingController().addRejectedBooking(req,res)
)
rejectedBookingRouter.route("/getAllRejectedBookings").get(
    (req,res)=>new RejectedBookingController().getAllRejectedBookings(req,res)
)
// bookingRouter.route("/acceptBooking").post(
//     (req,res)=>new BookingController().acceptBooking(req,res)
// )
// bookingRouter.route("/doneBooking").post(
//     (req,res)=>new BookingController().doneBooking(req,res)
// )


export default rejectedBookingRouter;