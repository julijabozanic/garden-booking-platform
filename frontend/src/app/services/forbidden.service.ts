import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForbiddenCredentials } from '../models/forbidden';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {

  constructor(private http: HttpClient) {}

  getForbiddenByUsername(username: string){
    return this.http.get<Message>(`http://localhost:4000/forbiddens/getForbiddenByUsername/${username}`)
  }

  getForbiddenByEmail(email: string){
    return this.http.get<Message>(`http://localhost:4000/forbiddens/getForbiddenByEmail/${email}`)
  }

  addForbidden(forbidden: ForbiddenCredentials){
    return this.http.post<Message>("http://localhost:4000/forbiddens/addForbidden", forbidden)
  }
}
