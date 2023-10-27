import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApimanagerService {
  private data:any;
  constructor(private http: HttpClient) { }

  getMyApicks(username:string):Promise<any>{
    const url = `http://localhost:3000/api/apick?username=${username}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })}
    return this.http.get<any>(url, httpOptions).toPromise();
  }

  getAllApicks(){
    const url = `http://localhost:3000/api/apick?active=true`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })}
    return this.http.get<any>(url, httpOptions).toPromise();
  }
/*
  registerApi(data:any){
    const url = 'http://localhost:3000/api/apick'; // Reemplaza por la URL de tu servidor
    const data = {username: user,password: pass};
    console.log(data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
*/
}
