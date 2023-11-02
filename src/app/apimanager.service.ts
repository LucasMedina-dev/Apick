import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApimanagerService {
  public data:any;
  private filtered:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}
  

  get getFiltered(): Observable<any> {
    return this.filtered.asObservable();
  }
  
  setFiltered(value: any) {
    this.filtered.next(value);
  }

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
  getApickById(id:string):Observable<any>{
    const url = `http://localhost:3000/api/apick?_id=${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })}
    
    return this.http.get<any>(url, httpOptions);
  }

  registerApick(apickData : any){
    const url = 'http://localhost:3000/api/apick'; // Reemplaza por la URL de tu servidor
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url,apickData, httpOptions).toPromise();
  }
  registerEndpoint(endpoint : any){
    const url = 'http://localhost:3000/api/endpoint'; // Reemplaza por la URL de tu servidor
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url,endpoint, httpOptions).toPromise();
  }


}
