import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public storeTokens(tokens: any) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  public updateAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  public getAccessToken() {
    return localStorage.getItem('access_token');
  }

  public getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  public clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
