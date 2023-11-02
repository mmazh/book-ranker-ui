import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JwtPayloadService } from '../helpers/jwt-payload.service';

@Injectable({
  providedIn: 'root'
})
export class JwtCountdownService {

  private jwtCountdownSubject: Subject<number | null>;
  jwtCountdown: Observable<number | null>;
  private stopTimerSubject: Subject<null>;
  private stopTimerObservable: Observable<null>;

  constructor(private jwtPayloadService: JwtPayloadService) {
    this.jwtCountdownSubject = new Subject<number | null>();
    this.jwtCountdown = this.jwtCountdownSubject.asObservable();
    this.stopTimerSubject = new Subject<null>();
    this.stopTimerObservable = this.stopTimerSubject.asObservable();
  }

  startTimer() {
    const countdown = interval(1000)
    .pipe(takeUntil(this.stopTimerObservable))
    .subscribe(() => {
      let current = this.jwtPayloadService.calculateRemainingJwtTime();
      this.jwtCountdownSubject.next(current);
      console.log(current);
      if (current <= 0) {
        countdown.unsubscribe();
        this.stopTimerSubject.next(null);
      }
    });
  }

  stopTimer() {
    this.stopTimerSubject.next(null);
  }
  
}
