import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtCountdownService {

  constructor(private authService: AuthService) {}

  private jwtCountdownSubject = new Subject<number>();
  jwtCountdown$: Observable<number> = this.jwtCountdownSubject.asObservable();

  private countdownInterval$ = interval(1000);
  private countdownSubscription$: any;

  startTimer() {
    let current = this.calculateRemainingJwtTime();
    this.countdownSubscription$ = this.countdownInterval$.subscribe(() => {
        current--;
        this.jwtCountdownSubject.next(current);
        if (current <= 0) this.countdownSubscription$.unsubscribe();
      });
  }

  private calculateRemainingJwtTime() {
    const payload = this.authService.tokenPayload();
    if (payload) return payload.exp - Math.floor((new Date).getTime() / 1000);
    return 0;
  }

  stopTimer() {
    this.countdownSubscription$.unsubscribe();
  }
}
