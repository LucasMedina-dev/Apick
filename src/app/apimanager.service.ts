import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApickStruct } from './create-api/apickStruct.interface';

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

  getMyApicks(username:string):Observable<any>{
    if(username!=''){
      const url = `http://localhost:3000/api/apick?username=${username}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })}
      return this.http.get<any>(url, httpOptions);
    }else{
      return of(null)
    }
  }

  getAllApicks():Observable<any>{
    const url = `http://localhost:3000/api/apick?active=true`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })}
    
    return this.http.get<any>(url, httpOptions)
  }
  getApickById(id:string):Observable<any>{
    const url = `http://localhost:3000/api/apick?_id=${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })}
    
    return this.http.get<any>(url, httpOptions);
  }

  registerApick(apickData : any):Observable<any>{
    const url = 'http://localhost:3000/api/apick';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url,apickData, httpOptions)
  }

  updateApickStatus(apickId : string, status:Boolean):Observable<any>{
    const url = `http://localhost:3000/api/apick/${apickId}`;
    return this.http.put<any>(url,{active:status});
  }
  
  registerEndpoint(endpoint : any):Observable<any>{
    const url = 'http://localhost:3000/api/endpoint';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url,endpoint, httpOptions);
  }
  deleteEntireApick(apiName : string):Observable<any>{
    const url = 'http://localhost:3000/api/apick';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body:{title:apiName}
    };
    return this.http.delete<any>(url,httpOptions);
  }
  updateEntireApick(apickDataModified:ApickStruct, apickDataOriginal:ApickStruct):Observable<any>{
    let data= {
      apickDataModified,
      apickDataOriginal
    }
    const url = 'http://localhost:3000/api/apick';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(url,data,httpOptions);
  }

}
