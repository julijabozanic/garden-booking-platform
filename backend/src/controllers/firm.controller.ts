import express from 'express'
import FirmM from '../models/firm'

export class FirmController{
    getAllFirms = (req: express.Request, res: express.Response)=>{
        FirmM.find({}).sort({name: 1}).then(firms=>{
            res.json(firms)
        }).catch((err)=>{
            console.log(err)
        })
    }

    registerFirm = async (req: express.Request, res: express.Response)=>{
        let name = req.body.name;
        let address = req.body.address;
        let services = req.body.services;
        let location = req.body.location;
        let contact = req.body.contact;
        let vacationFrom = req.body.vacationFrom;
        let vacationTo = req.body.vacationTo;
        let decorators = req.body.decorators;

        let firm = {
            name: name,
            address: address,
            services: services,
            location: location,
            contact: contact,
            vacationFrom: vacationFrom,
            vacationTo: vacationTo,
            decorators: decorators
        }

        new FirmM(firm).save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }

    getFirmByName = (req: express.Request,res: express.Response) =>{
        let name = req.params.name;
        FirmM.findOne({name: name}).then(
            firm=>{
                res.json(firm)
            }
        ).catch(err=>console.log(err))
    }

    // deleteBook = (req: express.Request, res: express.Response)=>{
    //     BookM.deleteOne({name: req.body.name}).then(books=>{
    //         res.json({message: "Book deleted"})
    //     }).catch((err)=>{
    //         console.log(err)
    //         res.json({message: "Fail"})
    //     })
    // }

    // updateBook = (req: express.Request, res: express.Response)=>{
    //     BookM.updateOne({name: req.body.name},
    //         {pages: req.body.pages}).then(books=>{
    //         res.json({message: "Book updated"})
    //     }).catch((err)=>{
    //         console.log(err)
    //         res.json({message: "Fail"})
    //     })
    // }
}