import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.css']
})
export class DecoratorComponent {

  constructor(private router: Router) {}

  logout() {
    // Brisanje svih podataka iz localStorage
    localStorage.clear();

    // Redirekcija na početnu stranicu
    this.router.navigate(['/']);
  }
}
