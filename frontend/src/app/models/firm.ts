import { User } from "./user"

export interface Service {
  name: string;
  price: number;
}

export class Firm {
  name: string = "";
  address: string = "";
  services: Service[] = [];  // Niz usluga sa cenama
  location: string = "";
  contact: string = "";
  vacationFrom: Date = new Date();
  vacationTo: Date = new Date();
  decorators: User[] = [];
}
