import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { RejectedBooking } from '../models/rejectedBooking';
import { RejectedBookingService } from '../services/rejected.booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[] = [];
  noBookings: RejectedBooking[] = [];
  logged!: string | null;
  user: User = new User();
  selectedBookingForComment: Booking | null = null;
  rejectedBooking: RejectedBooking = new RejectedBooking();

  constructor(private bookingService: BookingService, private userService: UserService, private rejectedBookingService: RejectedBookingService) { }

  ngOnInit(): void {
    this.logged = localStorage.getItem('logged');

    if (this.logged) {
      // Učitaj korisnika
      this.userService.getUserByUsername(this.logged).subscribe(
        userData => {
          this.user = userData;

          // Učitaj bookings i rejected bookings
          this.bookingService.getAllBookings().subscribe(
            bookingsData => {
              this.bookings = bookingsData;

              this.rejectedBookingService.getAllRejectedBookings().subscribe(
                rejectedData => {
                  this.noBookings = rejectedData;

                  // Filtriraj bookings na osnovu rejectedBookings
                  this.bookings = this.bookings.filter(booking =>
                    !this.noBookings.some(noBooking => 
                      noBooking.idBooking === booking._id && noBooking.username === this.logged
                    )
                  );
                },
                error => {
                  console.error('Greška prilikom dohvatanja odbijenih zahteva.', error);
                }
              );
            },
            error => {
              console.error('Greška prilikom dohvatanja svih zahteva.', error);
            }
          );
        },
        error => {
          console.error('Greška prilikom dohvatanja korisnika.', error);
        }
      );
    }
  }

  // Funkcija za prikazivanje polja za unos komentara
  showCommentField(booking: Booking) {
    this.selectedBookingForComment = booking;
    // Resetovanje komentara za novi izbor
    this.rejectedBooking.comment = '';
  }

  // Funkcija za otkazivanje odbijanja
  cancelReject() {
    this.selectedBookingForComment = null;
    this.rejectedBooking.comment = '';
  }

  // Funkcija za prihvatanje rezervacije
  acceptBooking(booking: Booking) {
    this.bookingService.acceptBooking(booking, this.user.username).subscribe(
      data => {
        alert(data.message);
        // Opcionalno: osvežite listu rezervacija nakon akcije
        this.refreshBookings();
      },
      error => {
        console.error('Greška prilikom prihvatanja rezervacije.', error);
      }
    );
  }

  submitRejectBooking(booking: Booking) {
    // Popunjavanje polja u RejectedBooking objektu
    this.rejectedBooking.idBooking = booking._id;
    this.rejectedBooking.username = this.user.username;
  
    if (this.rejectedBooking.comment && this.rejectedBooking.comment.trim() !== '') {
      this.rejectedBookingService.addRejectedBooking(this.rejectedBooking).subscribe(
        data => {
          alert(data.message);
          // Ukloni odbijeni booking iz liste bez osvežavanja sa servera
          this.bookings = this.bookings.filter(b => b._id !== booking._id);
          // Resetovanje stanja nakon uspešnog odbijanja
          this.selectedBookingForComment = null;
          this.rejectedBooking.comment = '';
        },
        error => {
          console.error('Greška prilikom odbijanja rezervacije.', error);
        }
      );
    } else {
      alert('Morate uneti komentar za odbijanje.');
    }
  }

  // Funkcija za završavanje posla
  doneBooking(booking: Booking) {
    this.bookingService.doneBooking(booking).subscribe(
      data => {
        alert(data.message);
        // Opcionalno: osvežite listu rezervacija nakon akcije
        this.refreshBookings();
      },
      error => {
        console.error('Greška prilikom završavanja posla.', error);
      }
    );
  }

  // Pomoćna funkcija za osvežavanje liste rezervacija
  private refreshBookings() {
    this.bookingService.getAllBookings().subscribe(
      data => {
        this.bookings = data;
      },
      error => {
        console.error('Greška prilikom dohvatanja svih zahteva.', error);
      }
    );
  }
}