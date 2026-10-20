  import { Component, OnInit } from '@angular/core';
  import { UserService } from '../services/user.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-administrator-login',
    templateUrl: './administrator-login.component.html',
    styleUrls: ['./administrator-login.component.css']
  })
  export class AdministratorLoginComponent implements OnInit{
    
    constructor(private servis: UserService, private router: Router){}

    ngOnInit(): void {
      localStorage.clear();
    }

    username: string = ""
    password: string = ""

    login() {
      this.servis.login(this.username, this.password).subscribe(
        data => {
          if ('message' in data) {
            alert(data.message);
          } else {
              localStorage.setItem("logged", data.username);
              localStorage.setItem("loggedUserType", data.type);

              if (data.type === "A") {
                this.router.navigate(['administrator']);
              }
            }
        },
        error => {
          console.error(error);
          alert("Greška na serveru. Pokušajte ponovo kasnije.");
        }
      );
    }
  }
