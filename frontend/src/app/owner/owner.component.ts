import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  constructor(private router: Router) {}

  logout() {
    // Brisanje svih podataka iz localStorage
    localStorage.clear();

    // Redirekcija na početnu stranicu
    this.router.navigate(['/']);
  }
}
