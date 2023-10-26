import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  logueado=false;
  username!: string;
  constructor(private http: HttpClient){ }

  tryLogin(user:String, pass:String):Promise<any>{
    const url = 'http://localhost:3000/api/login'; // Reemplaza por la URL de tu servidor
    const data = {username: user,password: pass};
    console.log(data)
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


  closeSesion(){
    this.logueado=false;
  }
}

