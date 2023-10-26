import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient){}
  tryLogin(username:String, password:String):Observable<any>{
    const url = '/login'; // Reemplaza por la URL de tu servidor
    const data = {
      username: username,
      password: password
    };
    console.log(data)
    return this.http.post<any>(url,data)
  }
}

