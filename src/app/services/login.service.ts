import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private requestService: RequestService) {}

  public login(username: string, password: string): Observable<any> {
    return this.requestService.login({ email: username, password });
  }

  public signUp(
    email: string,
    name: string,
    password: string
  ): Observable<any> {
    return this.requestService.postData('/auth/register', {
      email,
      name,
      password,
    });
  }

  public regenerateAccessToken(refreshToken: string): Observable<any> {
    return this.requestService.postData('/auth/refresh', { refreshToken });
  }
}
