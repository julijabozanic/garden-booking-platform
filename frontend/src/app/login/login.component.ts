import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Firm } from '../models/firm';
import { FirmService } from '../services/firm.service';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private bookingService: BookingService, private userService: UserService, private firmService: FirmService, private router: Router){}

  username: string = ""
  password: string = ""
  bookings: Booking[] = [];
  bookings24h: Booking[] = [];
  bookings7d: Booking[] = [];
  bookings30d: Booking[] = [];
  doneBookings: Booking[] = [];
  users: User[] = [];
  decorators: User[] = [];
  owners: User[] = [];
  firms: Firm[] = [];
  filteredFirms: Firm[] = [];
  searchName: string = '';
  searchAddress: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  ngOnInit(): void {
    localStorage.clear();
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.decorators = this.users.filter(user => user.type === 'D');
        this.owners = this.users.filter(user => user.type === 'O');
      },
      error => {
        console.error('Greška prilikom dohvatanja svih korisnika.', error);
      }
    );
    
    this.firmService.getAllFirms().subscribe(
      data => {
        this.firms = data;
        this.filteredFirms = this.firms;
      },
      (error) => {
        console.error('Greška prilikom dohvatanja svih firmi.', error);
      }
    );
    this.bookingService.getAllBookings().subscribe(
      data => {
        this.bookings = data;
        this.doneBookings = data.filter((booking: Booking) => booking.done === true);

        const now = new Date(); // Trenutno vreme

        this.bookings24h = this.bookings.filter((booking: Booking) => {
          const bookingDate = new Date(booking.bookingDate);
          return (now.getTime() - bookingDate.getTime()) <= (24 * 60 * 60 * 1000); // Razlika manja ili jednaka 24 sata u milisekundama
        });
    
        this.bookings7d = this.bookings.filter((booking: Booking) => {
          const bookingDate = new Date(booking.bookingDate);
          return (now.getTime() - bookingDate.getTime()) <= (7 * 24 * 60 * 60 * 1000); // Razlika manja ili jednaka 7 dana u milisekundama
        });
    
        this.bookings30d = this.bookings.filter((booking: Booking) => {
          const bookingDate = new Date(booking.bookingDate);
          return (now.getTime() - bookingDate.getTime()) <= (30 * 24 * 60 * 60 * 1000); // Razlika manja ili jednaka 30 dana u milisekundama
        });
      },
      (error) => {
        console.error('Greška prilikom dohvatanja svih firmi.', error);
      }
    );
  }

  onSearch(): void {
    this.filteredFirms = this.firms.filter(firm =>
      (this.searchName ? firm.name.toLowerCase().includes(this.searchName.toLowerCase()) : true) &&
      (this.searchAddress ? firm.address.toLowerCase().includes(this.searchAddress.toLowerCase()) : true)
    );
  }

  onSort(column: string): void {
    this.sortDirection = (this.sortColumn === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.sortColumn = column;
    this.filteredFirms.sort((a, b) => {
      const aValue = a[column as keyof Firm] as string;
      const bValue = b[column as keyof Firm] as string;
      return this.sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }


  login() {
    this.userService.login(this.username, this.password).subscribe(
      data => {
        if ('message' in data) {
          alert(data.message);
        } else {
          localStorage.setItem("logged", data.username);
          localStorage.setItem("loggedUserType", data.type);

          if (data.type === "O" && data.activated === true) {
            this.router.navigate(['owner']);
          } else if (data.type === "D" && data.activated === true) {
            this.router.navigate(['decorator']);
          } else if (data.type === "A") {
            alert('Ne mozete se ulogovati na ovoj formi kao administrator!');
          } else if (data.activated === false) {
            alert('Vaš nalog je blokiran.');
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
