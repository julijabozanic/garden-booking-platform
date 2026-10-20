import express from 'express'
import ForbiddenM from '../models/forbidden'

export class ForbiddenController{

  getForbiddenByUsername = (req: express.Request, res: express.Response) => {
    const username = req.params.username;
    ForbiddenM.findOne({ username: username }).then(forbidden => {
      if (forbidden) {
        res.json({ message: 'nadjeno' });
      } else {
        res.json({ message: 'nista' });
      }
        }).catch(err=>console.log(err))
  }

  getForbiddenByEmail = (req: express.Request, res: express.Response) =>{
    const email = req.params.email;
    ForbiddenM.findOne({email: email}).then(forbidden => {
      if (forbidden) {
        res.json({ message: 'nadjeno' });
      } else {
        res.json({ message: 'nista' });
      }
        }).catch(err=>console.log(err))
  }
  
  addForbidden = async (req: express.Request, res: express.Response)=>{
    let username = req.body.username;
    let email = req.body.email;

    let forbidden = {
        username: username,
        email: email
    }

    new ForbiddenM(forbidden).save().then(ok=>{
        res.json({message: 'Dodat forbidden'})
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message: "Error saving forbidden"});
    })
  }

}