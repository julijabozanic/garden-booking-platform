import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  @Input() loggedUser: User = new User();

  genders: string[] = ['M', 'Ž'];
  selectedGender: string = this.genders[0];

  constructor(private userService: UserService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggedUser'] && changes['loggedUser'].currentValue) {
      this.loggedUser = changes['loggedUser'].currentValue;
    }
  }

  ngOnInit(): void {
    const logged = localStorage.getItem('logged');
    if (logged) {
      // Ako je ulogovani korisnik već postavljen u localStorage, učitajte ga
      this.userService.getUserByUsername(logged).subscribe(user => {
        this.loggedUser = user;
      });
    } else if (this.loggedUser.username) {
      // Ako nije ulogovani korisnik, proverite da li postoji u `loggedUser` (ako je postavljen)
      this.userService.getUserByUsername(this.loggedUser.username).subscribe(user => {
        this.loggedUser = user;
      });
    }
  }

  updateProfile() {
    this.userService.updateUser(this.loggedUser).subscribe(response => {
      if (response.message === 'ok') {
        alert('Profil je uspešno ažuriran.');
      } else {
        alert(response.message);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        alert('Slika mora biti u JPG ili PNG formatu.');
        return;
      }
      if (file.size > 300 * 1024) {
        alert('Slika ne sme biti veća od 300 KB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.loggedUser.picture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  isOwner(): boolean {
    return this.loggedUser.type === 'O';
  }

  isAdministrator(): boolean {
    // Provera da li URL završava sa datim segmentom
    const currentUrl = this.router.url;
    if (currentUrl.endsWith('administrator')) return true;
    else return false;
  }
}
