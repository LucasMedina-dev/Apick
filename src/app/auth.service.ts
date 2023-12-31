import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public logueado=false;
  private URL= "https://apickdb.fly.dev"
  username!: string;
  constructor(private http: HttpClient){ }

  alreadyLocalUser(){
    return localStorage.getItem("username")
  }
  tryLogin(user:String, pass:String):Observable<any>{
    if(!this.alreadyLocalUser()){
      const url = `${this.URL}/api/login`; // Reemplaza por la URL de tu servidor
      const data = {username: user,password: pass};
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(url,data, httpOptions)
    }else{
      return of(this.alreadyLocalUser())
    }
  }
  tryRegister(data:any){
    const url = `${this.URL}/api/register`;
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

