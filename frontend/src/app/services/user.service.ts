import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string){
    const data={
      username: username,
      password: password
    }
    return this.http.post<User>("http://localhost:4000/users/login", data)

  }

  registerRequest(user: User){
    return this.http.post<Message>("http://localhost:4000/requests/registerRequest", user)
  }

  register(user: User){
    return this.http.post<Message>("http://localhost:4000/users/register", user)
  }

  getUserByEmail(email: string){
    return this.http.get<User>(`http://localhost:4000/users/getUserByEmail/${email}`)
  }

  getUserByUsername(username: string){
    return this.http.get<User>(`http://localhost:4000/users/getUserByUsername/${username}`)
  }

  updatePassword(username: string, password: string, salt: string){
    return this.http.post<Message>("http://localhost:4000/users/updatePassword",{username: username, password: password, salt:salt});
  }

  updateFreeToFalse(username: string){
    return this.http.post<Message>("http://localhost:4000/users/updateFreeToFalse",{username: username});
  }

  updateUser(user: User){
    return this.http.post<Message>("http://localhost:4000/users/updateUser",{user});
  }

  getAllUsers(){
    return this.http.get<User[]>("http://localhost:4000/users/getAllUsers");
  }

  getAllRequestUsers(){
    return this.http.get<User[]>("http://localhost:4000/requests/getAllRequestUsers");
  }

  updateActivated(user: User){
    return this.http.post<Message>("http://localhost:4000/users/updateActivated",{user});
  }

  addFirmToUser(firm: string, username: string){
    return this.http.post<Message>("http://localhost:4000/users/addFirmToUser",{username: username, firm: firm});
  }

  deleteUser(user: User){
    return this.http.post<Message>("http://localhost:4000/requests/deleteUser",{username: user.username});
  }

}
