import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Booking } from '../models/booking';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { RejectedBooking } from '../models/rejectedBooking';
import { RejectedBookingService } from '../services/rejected.booking.service';
import { FirmService } from '../services/firm.service';
import { Firm } from '../models/firm';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit{

  showDateTimePicker: boolean = false;
  bookingDate: string = '';
  bookingTime: string = '';
  combinedDateTime: Date = new Date();
  bookings: Booking[] = [];
  noBookings: RejectedBooking[] = [];
  user: User = new User();
  logged!: string | null;
  maintenance: Booking = new Booking();
  rejectedBooking: RejectedBooking = new RejectedBooking();

  constructor(private firmService: FirmService, private bookingService: BookingService, private userService: UserService, private router: Router, private rejectedBookingService: RejectedBookingService) { }

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

  isOlderThanSixMonths(doneDate: Date): boolean {
    if (!doneDate) {
      return false;
    }
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return new Date(doneDate) <= sixMonthsAgo;
  }

  rebook(booking: Booking) {
    this.maintenance.username = booking.username; 
    this.maintenance.firmname = booking.firmname;
    this.maintenance.area = booking.area;
    this.maintenance.type = booking.type;
    this.maintenance.decorator = booking.decorator;
    this.maintenance.maintenance += 1;
    if (booking.type === 'private'){
      this.maintenance.gardenPool = booking.gardenPool;
      this.maintenance.gardenGreen = booking.gardenGreen;
      this.maintenance.gardenFurniture = booking.gardenFurniture;
    } else {
      this.maintenance.fountain = booking.fountain;
      this.maintenance.gardenGreen = booking.gardenGreen;
      this.maintenance.tablesCount = booking.tablesCount;
      this.maintenance.chairsCount = booking.chairsCount;
      this.maintenance.description = booking.description;
      this.maintenance.services = booking.services;
    }
    this.bookingService.addBooking(this.maintenance).subscribe(
      data=>{
        if(data.message=="ok") alert("Odrzavanje je zakazano!")
      }
    );
  }


  combineDateAndTime() {
    if (!this.bookingDate || !this.bookingTime) {
      console.error("Datum i vreme moraju biti odabrani.");
      return;
    }
  
    // Kombinujemo datum i vreme u jedan string
    const combined = `${this.bookingDate}T${this.bookingTime}`;
  
    // Kreiramo novi Date objekat
    this.combinedDateTime = new Date(combined);
  }

    // Funkcija za prihvatanje rezervacije
    accept(booking: Booking) {
      if (this.bookingDate == '' || this.bookingTime == ''){
        alert('Unesite datum i vreme!')
        return;
      } else {
        this.showDateTimePicker = false;
        this.combineDateAndTime();
        alert(this.combinedDateTime);
        this.bookingService.acceptMaintenance(booking).subscribe(
          data => {
        this.bookingService.setDateTime(booking, this.combinedDateTime).subscribe(
          data => {
            alert(this.combinedDateTime)
          });
          });
        // this.bookingService.acceptBooking(booking, this.user.username).subscribe(
        //   data => {
        //     this.refreshBookings();
        //   },
        //   error => {
        //     console.error('Greška prilikom prihvatanja rezervacije.', error);
        //   }
        // );
      }
    }

    reject(booking: Booking) {
      // Popunjavanje polja u RejectedBooking objektu
      this.rejectedBooking.idBooking = booking._id;
      this.rejectedBooking.username = this.user.username;
      this.rejectedBooking.comment = 'odbijanje odrzavanja';
    
        this.rejectedBookingService.addRejectedBooking(this.rejectedBooking).subscribe(
          data => {
            alert(data.message);
            this.bookingService.deleteDecorator(booking).subscribe(
              data => {
                alert(data.message);
              });

            // Ukloni odbijeni booking iz liste bez osvežavanja sa servera
            this.bookings = this.bookings.filter(b => b._id !== booking._id);
            // location.reload();
            
          },
          error => {
            console.error('Greška prilikom odbijanja rezervacije.', error);
          }
        );
    }

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
