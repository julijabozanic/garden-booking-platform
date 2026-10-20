import express from 'express'
import RejectedBookingM from '../models/rejectedBooking'

export class RejectedBookingController{
  
    addRejectedBooking = (req: express.Request, res: express.Response)=>{
        let idBooking = req.body.idBooking;
        let username = req.body.username;
        let comment = req.body.comment;

        let booking = {
            idBooking: idBooking,
            username: username,
            comment: comment
        }

        new RejectedBookingM(booking).save().then(ok=>{
            res.json({message: 'Dodato rejected booking.'})
        }).catch(err=>{
            console.log(err);
            res.status(500).json({message: "Error saving rejected booking"});
        })
    }

    getAllRejectedBookings = (req: express.Request, res: express.Response)=>{
        RejectedBookingM.find({}).then(rejectedBookings=>{
            res.json(rejectedBookings)
        }).catch((err)=>{
            console.log(err)
        })
    }

    // acceptBooking = (req: express.Request, res: express.Response)=>{
   
    //     BookingM.updateOne({_id: req.body.booking._id},
    //       {decorator: req.body.username}).then(bookings=>{
    //       res.json({message: "ok"})
    //   }).catch((err)=>{
    //       console.log(err)
    //       res.json({message: "Neuspeli pokušaj dodavanja dekoratera u zakazivanje."})
    //   }) 
    // }

    // doneBooking = (req: express.Request, res: express.Response)=>{
   
    //     BookingM.updateOne({_id: req.body._id},
    //       {done: true}).then(bookings=>{
    //       res.json({message: "Evo posao je zavrsen"})
    //   }).catch((err)=>{
    //       console.log(err)
    //       res.json({message: "Neuspeli pokušaj završavanja posla."})
    //   }) 
    // }

}