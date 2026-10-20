import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-password-new',
  templateUrl: './password-new.component.html',
  styleUrls: ['./password-new.component.css']
})
export class PasswordNewComponent{

  constructor(private service: UserService, private router: Router){}

  username: string = '';
  password1: string = '';
  password2: string = '';
  password3: string = '';
  oldPassword: string = '';
  passwordError: string = '';
  user: User = new User();

  // ngOnInit(): void {
  //   let logged = localStorage.getItem("logged")
  //   if(logged){
  //     this.service.getUserByUsername(logged).subscribe(user=>{
  //       this.loggedUser = user;
  //       this.oldPassword =  user.password;
  //     })
  //   }
  // }

  updatePassword() {
    if (this.username === '' || this.password1 === '' || this.password2 === '' || this.password3 === '') {
      alert('Popunite sva polja da biste promenili lozinku!');
      return;
    }

    if(!this.validatePassword()){
      alert(this.passwordError)
      return;
    }

    if (this.password2 !== this.password3) {
      alert('Nove lozinke se ne podudaraju!');
      return;
    }

    
    this.service.login(this.username, this.password1).subscribe(
      data => {
        if ('message' in data) {
          alert(data.message);
          return;
      } else {
          this.service.updatePassword(this.username, this.password2, data.salt).subscribe(
            data => {
              alert(data.message);
              this.router.navigate(['']);
            },);
          }
        });
  }

  validatePassword() {
    const password = this.password2
    const regex = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&]).{6,10}$/;
    if (!regex.test(password)) {
      this.passwordError = 'Lozinka mora imati minimalno 6 i maksimalno 10 karaktera, bar jedno veliko slovo, bar tri mala slova, bar jedan broj i bar jedan specijalni karakter, i mora počinjati slovom.';
      return false;
    } else {
      this.passwordError = '';
      return true;
    }
  }

}
