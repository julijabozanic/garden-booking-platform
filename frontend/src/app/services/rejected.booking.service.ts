import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RejectedBooking } from '../models/rejectedBooking';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class RejectedBookingService {

  constructor(private http: HttpClient) {}

  addRejectedBooking(rejectedBooking: RejectedBooking){
    return this.http.post<Message>("http://localhost:4000/rejectedBookings/addRejectedBooking", rejectedBooking)
  }
  getAllRejectedBookings(){
    return this.http.get<RejectedBooking[]>("http://localhost:4000/rejectedBookings/getAllRejectedBookings");
  }
}
