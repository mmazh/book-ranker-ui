import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtCountdownService } from 'src/app/services/jwt-countdown.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.css']
})
export class LoginSidebarComponent implements OnInit {

  public seconds: number|null = null;

  constructor(private authService: AuthService, private router: Router, private jwtcounter: JwtCountdownService) {}

  ngOnInit() {
    if (!this.authService.tokenExpired()) {
      this.jwtcounter.stopTimer();
      this.jwtcounter.startTimer(); 
    }
    this.jwtcounter.jwtCountdown$.subscribe((countdown: number) => {
      this.seconds = countdown;
    });
  }

  loggedIn() {
    const loggedIn = !this.authService.tokenExpired();
    if (this.seconds === 0) this.logout();
    return loggedIn;
  }

  getUsername() {
    let payload = this.authService.tokenPayload();
    if (payload) return payload['username'];
  }

  refreshToken() {
    this.authService.refreshToken().subscribe((response: any) => {
      if (response.status === 200) {
        this.jwtcounter.stopTimer();
        this.jwtcounter.startTimer();
      }
    })
  }
  
  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout().subscribe((response: any) => {
      this.jwtcounter.stopTimer();
      this.seconds = null;
      window.location.reload();
    })
  }
}
