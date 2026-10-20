import { Service } from "./firm";

export class Booking {
  _id: string = "";
  username: string = '';
  firmname: string = '';
  dateTime: Date = new Date();
  area: number = 0;
  type: string = '';
  maintenance: number = 0;
  acceptedMaintenance: boolean = false;
  fountain?: number;
  gardenGreen?: number;
  tablesCount?: number;
  chairsCount?: number;
  gardenPool?: number;
  gardenFurniture?: number;
  description?: string;
  services?: Service[] = [];
  bookingDate: Date = new Date();
  done: boolean = false;
  doneDate: Date = new Date();
  decorator: string = '';
}