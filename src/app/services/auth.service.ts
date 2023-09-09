import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { tap, map } from 'rxjs/operators';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly ROOT_URL;

  constructor(private webReqService: WebRequestService) { 
    this.ROOT_URL = 'https://localhost:443';
  }

  login(payload: Object) {
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/login`, payload)
      .pipe(tap(res => this.setSession(res)));
  }

  refreshToken() {
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/token`, {})
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(authResult: any) {
    if (Object.hasOwn(authResult, 'accessToken')) {
      localStorage.setItem('Access-Token', authResult.accessToken);
    }
  }

  logout() {
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/logout`, {})
      .pipe(tap((res) => this.removeSession(res)));
  }

  private removeSession(result: any) {
    if (result.status === 200) {
      localStorage.removeItem("Access-Token");
    }
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
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/user/`, {})
  }
}
