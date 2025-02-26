import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public login(body: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.baseURI}/auth/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public getData(getEndpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(`${environment.baseURI}${getEndpoint}`, {
      params: params,
    });
  }

  public postData(postEndpoint: string, body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseURI}${postEndpoint}`, body);
  }

  public putData(putEndpoint: string, body: any): Observable<any> {
    return this.http.put<any>(`${environment.baseURI}${putEndpoint}`, body);
  }

  public deleteData(deleteEndpoint: string): Observable<any> {
    return this.http.delete<any>(deleteEndpoint);
  }
}
