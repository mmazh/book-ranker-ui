import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtCountdownService {

  constructor() {}

  private jwtCountdownSubject = new Subject<number>();
  jwtCountdown$: Observable<number> = this.jwtCountdownSubject.asObservable();

  private countdownInterval$ = interval(1000);
  private countdownSubscription$: any;

  startTimer() {
    this.countdownSubscription$ = this.countdownInterval$.subscribe(() => {
      let current = this.calculateRemainingJwtTime();
      this.jwtCountdownSubject.next(current);
      if (current <= 0) {
        this.countdownSubscription$.unsubscribe();
      }
    });
  }

  private calculateRemainingJwtTime() {
    const payload = this.tokenPayload();
    if (payload) return payload.exp - Math.floor((new Date).getTime() / 1000);
    return 0;
  }

  private tokenPayload() {
    const token = localStorage.getItem("Access-Token");
    if (token) return JSON.parse(atob(token.split('.')[1]));
    return null;
  }

  stopTimer() {
    if (this.countdownSubscription$) {
      this.countdownSubscription$.unsubscribe();
    }
  }
  
}
