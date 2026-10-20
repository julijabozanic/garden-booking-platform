import express from 'express'
import bcrypt from 'bcrypt';
// import crypto from 'crypto';
import {UserM} from '../models/user'

export class UserController{

    login = async (req: express.Request, res: express.Response) => {
        let usernameP = req.body.username;
        let passwordP = req.body.password;
    
        try {
          const user = await UserM.findOne({ username: usernameP });
    
          if (!user) {
            return res.json({ message: 'Ne postoji traženi korisnik.' });
          }
    
          const salt = user.salt;
          const hashedPassword = user.password;
    
          const hash = await bcrypt.hash(passwordP, salt);
    
          if (hash === hashedPassword) {
            res.json(user);
          } else {
            res.json({ message: 'Pogrešna lozinka.' });
          }
        } catch (err) {
          console.error(err);
          res.json({ message: 'Greška na serveru.' });
        }
      }

    register = async (req: express.Request, res: express.Response)=>{
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

        // const newSalt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, newSalt);

        let user = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            sex: sex,
            address: address,
            telephone: telephone,
            email: email,
            picture: picture,
            card: card,
            type: type,
            salt: salt,
            activated: activated,
            free: free,
            firm: firm
        }

        new UserM(user).save().then(ok=>{
            res.json({message: 'ok'})
        }).catch(err=>{
            console.log(err);
            res.status(500).json({message: "Error saving user"});
        })
    }

    addToFavourites= (req: express.Request, res: express.Response)=>{
        let datee = new Date();
        let dateStr = datee.getFullYear() + "-" + 
        (datee.getMonth()+1) + "-" + datee.getDate();
        let fav = {
            name: req.body.name,
            author: req.body.author,
            date: dateStr
        }
        UserM.updateOne({username: req.body.user}, 
            {$push: {favourites: fav}}).then(data=>{
                res.json({message: "Ok"})
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    getUserByUsername = (req: express.Request,
        res: express.Response) =>{
            let username = req.params.username;
            UserM.findOne({username: username}).then(
                user=>{
                    res.json(user)
                }
            ).catch(err=>console.log(err))
        }

    getUserByEmail = (req: express.Request,
        res: express.Response) =>{
            let email = req.params.email;
            UserM.findOne({email: email}).then(
                user=>{
                    res.json(user)
                }
            ).catch(err=>console.log(err))
        }

    changeFavourite=(req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        let bookname = req.body.bookname;

        /*UserM.updateOne({username: user},
        {$pull: {favourites: {name: bookname}}}).then(
                ok=>res.json({message: "Ok"})
        ).catch(err=>console.log(err))*/

        UserM.updateOne({username: user}, 
            {$set: {"favourites.$[f].name": "Changed name"}}, 
            {arrayFilters: [{"f.name": bookname}]}).then(
                ok=>res.json({message: "Ok"})
        ).catch(err=>console.log(err))
    }

    updatePassword = async (req: express.Request, res: express.Response)=>{
        let salt = req.body.salt;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        UserM.updateOne({username: req.body.username},
            {password: hashedPassword}).then(users=>{
            res.json({message: "Lozinka je promenjena."})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Neuspeli pokusaj menjanja sifre."})
        })
    }

    updateFreeToFalse = (req: express.Request, res: express.Response)=>{
      UserM.updateOne({username: req.body.username},
          {free: false}).then(users=>{
          res.json({message: "ok"})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokusaj menjanja free stanja."})
      })
  }

    updateActivated = (req: express.Request, res: express.Response)=>{
      if (req.body.user.activated === true){
        UserM.updateOne({username: req.body.user.username},
          {activated: false}).then(users=>{
          res.json({message: "ok"})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokusaj menjanja activated polja."})
      })
      } else {
        UserM.updateOne({username: req.body.user.username},
          {activated: true}).then(users=>{
          res.json({message: "ok"})
      }).catch((err)=>{
          console.log(err)
          res.json({message: "Neuspeli pokusaj menjanja activated polja."})
      })
      }
      
  }

    updateUser = async (req: express.Request, res: express.Response) => {
        try {
          if (!req.body || !req.body.user) {
            return res.json({ message: 'Podaci za ažuriranje nisu prosleđeni.' });
          }
      
          const { username, firstname, lastname, address, email, telephone, picture, card, sex } = req.body.user;
          
          if (!username || !firstname || !lastname || !address || !email || !telephone || !card || !sex) {
            return res.json({ message: 'Svi podaci su obavezni.' });
          }
      
          const result = await UserM.updateOne(
            { username },
            {
              $set: {
                username,
                firstname,
                lastname,
                address,
                email,
                telephone,
                card,
                sex,
                picture // Dodajte polje za sliku
              }
            }
          );
      
          if (result.modifiedCount > 0) {
            res.json({ message: 'ok' });
          } else {
            res.json({ message: 'Nema promena.' });
          }
        } catch (err) {
          console.error(err);
          res.json({ message: 'Neuspeli pokušaj ažuriranja.' });
        }
      }


    getAllUsers = (req: express.Request, res: express.Response)=>{
      UserM.find({}).sort({firstname: 1}).then(users=>{
          res.json(users)
      }).catch((err)=>{
          console.log(err)
      })
  }

  addFirmToUser = (req: express.Request, res: express.Response)=>{
   
      UserM.updateOne({username: req.body.username},
        {firm: req.body.firm}).then(users=>{
        res.json({message: "ok"})
    }).catch((err)=>{
        console.log(err)
        res.json({message: "Neuspeli pokusaj menjanja firm polja."})
    }) 
  }
}