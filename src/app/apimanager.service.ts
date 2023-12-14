import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApickStruct } from './create-api/apickStruct.interface';
import { CustomizerStruct } from './structures/customizerStruct.interface';

@Injectable({
  providedIn: 'root',
})
export class ApimanagerService {
  public data: any;
  private filtered: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private URL="https://apickdb.fly.dev";
  constructor(private http: HttpClient) {}

  get getFiltered(): Observable<any> {
    return this.filtered.asObservable();
  }

  setFiltered(value: any) {
    this.filtered.next(value);
  }

  // APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS -- APICKS
  getMyApicks(username: string): Observable<any> {
    if (username != '') {
      const url = `${this.URL}/api/apick?username=${username}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return this.http.get<any>(url, httpOptions);
    } else {
      return of(null);
    }
  }

  getAllApicks(): Observable<any> {
    const url = `${this.URL}/api/apick?active=true`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<any>(url, httpOptions);
  }
  getApickById(id: string): Observable<any> {
    const url = `${this.URL}/api/apick?_id=${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<any>(url, httpOptions);
  }
  registerApick(apickData: any): Observable<any> {
    const url = `${this.URL}/api/apick`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, apickData, httpOptions);
  }
  updateApickStatus(apickId: string, status: Boolean): Observable<any> {
    const url = `${this.URL}/api/apick/${apickId}`;
    return this.http.put<any>(url, { active: status });
  }
  deleteEntireApick(apiName: string): Observable<any> {
    const url = `${this.URL}/api/apick`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { title: apiName },
    };
    return this.http.delete<any>(url, httpOptions);
  }
  updateEntireApick(
    apickDataModified: ApickStruct,
    apickDataOriginal: ApickStruct
  ): Observable<any> {
    let data = {
      apickDataModified,
      apickDataOriginal,
    };
    const url = `${this.URL}/api/apick`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(url, data, httpOptions);
  }

  // ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS -- ENDPOINTS
  getDocs(urlRequested: string, key: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: key,
      }),
    };
    return this.http.get<any>(urlRequested, httpOptions);
  }
  postDoc(urlRequested: string, object: any, key: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: key,
      }),
    };
    return this.http.post<any>(urlRequested, object, httpOptions);
  }
  getEndpointId(title: string, endpoint: string): Observable<any> {
    const url = `${this.URL}/api/endpoint?title=${title}&endpoint=${endpoint}`;
    return this.http.get<any>(url);
  }
  registerEndpoint(endpoint: any): Observable<any> {
    const url = `${this.URL}/api/endpoint`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, endpoint, httpOptions);
  }

  // CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS -- CUSTOMS
  getCustomizerById(idEndpoint: string, method: string): Observable<any> {
    const url = `${this.URL}/api/custom?id=${idEndpoint}&method=${method}`;
    return this.http.get<any>(url);
  }
  saveCustomizerData(customizerData: CustomizerStruct, newData: any) {
    const url = `${this.URL}/api/custom/${customizerData._id}`;
    return this.http.put<any>(url, newData);
  }

  // APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY -- APIKEY
  getApiKey(apiId: string, username: any): Observable<any> {
    let url;
    if (username) {
      url = `${this.URL}/api/keys/${apiId}?username=${username}`;
    } else {
      url = `${this.URL}/api/keys/${apiId}`;
    }
    return this.http.get<any>(url);
  }
  createApiKey(apiId: string): Observable<any> {
    let url = `${this.URL}/api/keys`;
    return this.http.post<any>(url, { apiId: apiId });
  }
  createUserKey(apiId: string, username: any): Observable<any> {
    let url = `${this.URL}/api/keys/${apiId}`;

    return this.http.post<any>(url, { username: username });
  }
  updateEnabledApiKey(apiId: string, status: boolean): Observable<any> {
    let url = `${this.URL}/api/keys/${apiId}`;
    return this.http.put<any>(url, { keyEnabled: status });
  }
}
