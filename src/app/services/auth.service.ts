import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { JwtCountdownService } from './jwt-countdown.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { JwtPayloadService } from '../helpers/jwt-payload.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly ROOT_URL;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private webReqService: WebRequestService,
    private jwtCountdownService: JwtCountdownService,
    private router: Router,
    private jwtPayloadService: JwtPayloadService) 
  {
    this.ROOT_URL = 'https://localhost:443';
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(payload: Object) {
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/login`, payload)
      .pipe(tap((res: any) => {
        this.setSession(res);
        if (res?.status && res.status === 200) {
          this.jwtCountdownService.startTimer();
          const currentUser = new User(res?.status, res?.userId, res?.username, res?.jwtExpiry);
          this.userSubject.next(currentUser);
        }
      }
    ));
  }

  refreshToken() {
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/token`, {})
      .pipe(tap((res: any) => {
        if (res?.status && res.status === 200) {
          this.setSession(res);
        }
      }))
    }

  logout() {
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/logout`, {})
      .pipe(tap((res: any) => {
        this.removeSession(res);
        this.userSubject.next(null);
        this.router.navigate(['/']);
      }
    ));
  }

  deleteAccount() {
    return this.webReqService.postWithCredentials(`${this.ROOT_URL}/user/`, {})
      .pipe(tap((res: any) => {
        this.logout();
      }
    ));
  }


  // helpers

  loggedIn() {
    return this.jwtPayloadService.calculateRemainingJwtTime() > 0;
  }

  private setSession(authResult: any) {
    if (Object.hasOwn(authResult, 'jwtAccessToken')) {
      localStorage.setItem('Access-Token', authResult.jwtAccessToken);
    }
  }

  private removeSession(result: any) {
    if (result.status === 200) {
      localStorage.removeItem("Access-Token");
    }
  }
}
