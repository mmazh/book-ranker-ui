import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly ROOT_URL;

  constructor(private webReqService: WebRequestService) { 
    this.ROOT_URL = 'http://localhost:8081';
  }

  login(payload: Object) {
    return this.webReqService.post(`${this.ROOT_URL}/login`, payload)
      .pipe(tap(res => this.setSession(res)));
  }

  refreshToken() {
    return this.webReqService.get(`${this.ROOT_URL}/token`)
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(authResult: any) {
    localStorage.setItem('Access-Token', authResult.accessToken);
  }

  logout() {
    return this.webReqService.delete(`${this.ROOT_URL}/logout`)
      .pipe(tap(() => localStorage.removeItem("Access-Token")));
  }

  tokenExpired() {
    const payload = this.tokenPayload();
    if (payload) return (Math.floor((new Date).getTime() / 1000)) >= payload.exp;
    return true;
  }

  tokenPayload() {
    const token = localStorage.getItem("Access-Token");
    if (token) return JSON.parse(atob(token.split('.')[1]));
    return null;
  }

  deleteAccount() {
    return this.webReqService.delete(`${this.ROOT_URL}/user/`)
  }
}
