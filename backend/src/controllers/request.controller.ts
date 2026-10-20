import express from 'express'
import { RequestM, UserM } from '../models/user';
import bcrypt from 'bcrypt';

export class RequestController{
  registerRequest = async (req: express.Request, res: express.Response)=>{
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let sex = req.body.sex;
    let address = req.body.address;
    let telephone = req.body.telephone;
    let email = req.body.email;
    let picture = req.body.picture;
    let card = req.body.card;
    let type = req.body.type;
    let salt = req.body.salt;
    let activated = req.body.activated;
    let free = req.body.free;
    let firm = req.body.firm;

    const newSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, newSalt);

    let user = {
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        sex: sex,
        address: address,
        telephone: telephone,
        email: email,
        picture: picture,
        card: card,
        type: type,
        salt: newSalt,
        activated: activated,
        free: free,
        firm: firm
    }

    new RequestM(user).save().then(ok=>{
        res.json({message: 'ok'})
    }).catch(err=>{
        console.log(err)
    })
}


  getAllRequestUsers = (req: express.Request, res: express.Response)=>{
        RequestM.find({}).then(requests=>{
            res.json(requests)
        }).catch((err)=>{
            console.log(err)
        })
    }

  deleteUser = (req: express.Request, res: express.Response)=>{
    RequestM.deleteOne({username: req.body.username}).then(requests=>{
        res.json({message: "Zahtev obrisan."})
    }).catch((err)=>{
        console.log(err)
        res.json({message: "Neuspelo brisanje zahteva."})
    })
}
  
}