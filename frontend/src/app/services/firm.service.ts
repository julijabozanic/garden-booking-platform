import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firm } from '../models/firm';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(private http: HttpClient) {}

  getAllFirms(){
    return this.http.get<Firm[]>("http://localhost:4000/firms/getAllFirms");
  }
  registerFirm(firm: Firm){
    return this.http.post<Message>("http://localhost:4000/firms/registerFirm", firm)
  }
  getFirmByName(name: string){
    return this.http.get<Firm>(`http://localhost:4000/firms/getFirmByName/${name}`)
  }

}
