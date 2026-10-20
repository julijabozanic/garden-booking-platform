import express from 'express'
import BookingM from '../models/booking'

export class BookingController{
  
    addBooking = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let firmname = req.body.firmname;
        let area = req.body.area;
        let dateTime = req.body.dateTime;
        let bookingDate = req.body.bookingDate;
        let type = req.body.type;
        let gardenPool = req.body.gardenPool;
        let gardenGreen = req.body.gardenGreen;
        let gardenFurniture = req.body.gardenFurniture;
        let fountain = req.body.fountain;
        let tablesCount = req.body.tablesCount;
        let chairsCount = req.body.chairsCount;
        let description = req.body.description;
        let services = req.body.services;
        let done = req.body.done;
        let doneDate = req.body.doneDate;
        let decorator = req.body.decorator;
        let maintenance = req.body.maintenance;
        let acceptedMaintenance = req.body.acceptedMaintenance;

        let booking = {
            username: username,
            firmname: firmname,
            area: area,
            dateTime: dateTime,
            bookingDate: bookingDate,
            type: type,
            gardenPool: gardenPool,
            gardenGreen: gardenGreen,
            gardenFurniture: gardenFurniture,
            fountain: fountain,
            tablesCount: tablesCount,
            chairsCount: chairsCount,
            description: description,
            services: services,
            done: done,
            decorator: decorator,
            doneDate: doneDate,
            maintenance: maintenance,
            acceptedMaintenance: acceptedMaintenance
        }

        new BookingM(booking).save().then(ok=>{
            res.json({message: 'ok'})
        }).catch(err=>{
            console.log(err);
            res.status(500).json({message: "Error saving booking"});
        })
    }

    getAllBookings = (req: express.Request, res: express.Response)=>{
        BookingM.find({}).sort({bookingDate: -1}).then(bookings=>{
            res.json(bookings)
        }).catch((err)=>{
            console.log(err)
        })
    }

    acceptBooking = (req: express.Request, res: express.Response)=>{
   
        BookingM.updateOne({_id: req.body.booking._id},
          {decorator: req.body.username}).then(bookings=>{
          res.json({message: "ok"})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokušaj dodavanja dekoratera u zakazivanje."})
      }) 
    }

    doneBooking = (req: express.Request, res: express.Response)=>{
   
        BookingM.updateOne({_id: req.body._id},
          {done: true, doneDate: Date.now()}).then(bookings=>{
          res.json({message: "Posao je zavrsen"})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokušaj završavanja posla."})
      }) 
    }

    deleteDecorator = (req: express.Request, res: express.Response)=>{
   
        BookingM.updateOne({_id: req.body._id},
          {decorator: ""}).then(bookings=>{
          res.json({message: "Dekorator je izbrisan."})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokušaj brisanja dekoratora."})
      }) 
    }

    acceptMaintenance = (req: express.Request, res: express.Response)=>{
        BookingM.updateOne({_id: req.body._id},
          {acceptedMaintenance: true}).then(bookings=>{
          res.json({message: "Odrzavanje je prihvaceno."})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokušaj prihvatanja odrzavanja."})
      }) 
    }

    setDateTime = (req: express.Request, res: express.Response)=>{
        BookingM.updateOne({_id: req.body._id},
          {'dateTime': req.body.dateTime}).then(bookings=>{
          res.json({message: "Datum izmenjen."})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokušaj menjanja datuma."})
      }) 
    }

}