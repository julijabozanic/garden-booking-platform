import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { Message } from '../models/message';
import { RejectedBooking } from '../models/rejectedBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {}

  addBooking(booking: Booking){
    return this.http.post<Message>("http://localhost:4000/bookings/addBooking", booking)
  }

  getAllBookings(){
    return this.http.get<Booking[]>("http://localhost:4000/bookings/getAllBookings");
  }

  acceptBooking(booking: Booking, username: String){
    return this.http.post<Message>("http://localhost:4000/bookings/acceptBooking", {booking: booking, username: username})
  }

  doneBooking(booking: Booking){
    return this.http.post<Message>("http://localhost:4000/bookings/doneBooking", booking)
  }

  deleteDecorator(booking: Booking){
    return this.http.post<Message>("http://localhost:4000/bookings/deleteDecorator", booking)
  }

  acceptMaintenance(booking: Booking){
    return this.http.post<Message>("http://localhost:4000/bookings/acceptMaintenance", booking)
  }

  rejectBooking(booking: RejectedBooking){
    return this.http.post<Message>("http://localhost:4000/bookings/doneBooking", booking)
  }

  setDateTime(booking: Booking, doneDate: Date){
    return this.http.post<Message>("http://localhost:4000/bookings/setDateTime", {booking: booking, doneDate: doneDate})
  }
}
