import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FirmService } from '../services/firm.service';
import { Firm } from '../models/firm';
import { NgForm } from '@angular/forms';
import { ForbiddenService } from '../services/forbidden.service';
import { ForbiddenCredentials } from '../models/forbidden';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  
  @ViewChild('registerFirmForm') form!: NgForm;

  constructor(private userService: UserService, private firmService: FirmService, private forbiddenService: ForbiddenService, private router: Router){}

  users: User[] = [];
  decorators: User[] = [];
  freeDecorators: User[] = [];
  selectedDecorators: boolean[] = [];
  owners: User[] = [];
  firm: Firm = new Firm();
  firms: Firm[] = [];
  selectedUser: User | null = null;
  registrationRequests: User[] = [];
  forbiddenCredentials: ForbiddenCredentials = new ForbiddenCredentials();

  selectUserForUpdate(user: User) {
    this.selectedUser = user;
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.decorators = this.users.filter(user => user.type === 'D');
        this.freeDecorators = this.users.filter(user => user.type === 'D' && user.free ===true);
        this.owners = this.users.filter(user => user.type === 'O');
      },
      error => {
        console.error('Greška prilikom dohvatanja svih korisnika.', error);
      }
    );
    this.firmService.getAllFirms().subscribe(
      data => {
        this.firms = data;
      },
      error => {
        console.error('Greška prilikom dohvatanja svih korisnika.', error);
      }
    );
    this.userService.getAllRequestUsers().subscribe(
      data => {
        this.registrationRequests = data;
      },
      error => {
        console.error('Greška prilikom dohvatanja svih zahteva.', error);
      }
    );
  }

  addService() {
    this.firm.services.push({ name: '', price: 0 });
  }

  removeService(index: number) {
    this.firm.services.splice(index, 1);
  }

  registerFirm(){
    if (!this.form.valid) {
      alert('Molimo popunite sva polja.');
      return;
    }
    this.firm.decorators = this.freeDecorators.filter((_, index) => this.selectedDecorators[index]);
    if (this.firm.decorators.length < 2){
      alert('Morate cekirati barem dva dekoratera!');
      return;
    }
    this.firmService.registerFirm(this.firm).subscribe(
      data=>{
        if(data.message=="ok"){
          alert("Dodato!")
          for (let decorator of this.firm.decorators){
            this.userService.addFirmToUser(this.firm.name, decorator.username).subscribe(
              data=>{
                if(data.message=="ok"){
                  alert("Dekoratorima su dodate firme!")
                }
              })
          }
        }
      }
    )
    
    for (let user of this.firm.decorators) {
      this.userService.updateFreeToFalse(user.username).subscribe(
        data=>{
          if(data.message=="ok") alert("Promenjeno na false.")
        }
      )
    }
  }

  updateActivated(user: User){
    this.selectedUser = user;
    this.userService.updateActivated(this.selectedUser).subscribe(
      data=>{
        alert(data.message)
      }
    )
  }

  acceptRequest(user: User){
    this.selectedUser = user;
    this.userService.register(this.selectedUser).subscribe(
      data=>{
        alert(data.message)
      }
    )
    this.userService.deleteUser(this.selectedUser).subscribe(
      data=>{
        alert(data.message)
      }
    )
  }

  declineRequest(user: User){
    this.selectedUser = user;
    this.forbiddenCredentials.username = this.selectedUser.username;
    this.forbiddenCredentials.email = this.selectedUser.email;
    
    this.forbiddenService.addForbidden(this.forbiddenCredentials).subscribe(
      data=>{
        alert(data.message)
      }
    )
    this.userService.deleteUser(this.selectedUser).subscribe(
      data=>{
        alert(data.message)
      }
    )
  }

  logout() {
    // Brisanje svih podataka iz localStorage
    localStorage.clear();

    // Redirekcija na početnu stranicu
    this.router.navigate(['/']);
  }

}
