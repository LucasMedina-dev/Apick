import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApimanagerService {
  data:any;
  constructor() { }
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
