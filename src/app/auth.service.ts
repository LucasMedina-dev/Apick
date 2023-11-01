import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  logueado=false;
  username!: string;
  constructor(private http: HttpClient){ }

  tryLogin(user:String, pass:String):Promise<any>{
    const url = 'http://localhost:3000/api/login'; // Reemplaza por la URL de tu servidor
    const data = {username: user,password: pass};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(url,data, httpOptions).toPromise();
  }
  tryRegister(data:any){
    const url = 'http://localhost:3000/api/register';
    console.log(data)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(url,data, httpOptions).toPromise();
  }

  getUsername(){
    return this.username;
  }
  closeSesion(){
    this.logueado=false;
  }
}

