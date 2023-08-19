import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { JwtCountdownService } from 'src/app/jwt-countdown.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.css']
})
export class LoginSidebarComponent implements OnInit {

  public seconds: number|null = null;

  constructor(private authService: AuthService, private router: Router, private jwtcounter: JwtCountdownService) {}

  ngOnInit(): void {
    this.jwtcounter.jwtCountdown$.subscribe((countdown: number) => {
      this.seconds = countdown;
    });
  }

  loggedIn() {
    return !this.authService.tokenExpired();
  }

  getUsername() {
    let payload = this.authService.tokenPayload();
    if (payload) return payload['username'];
  }

  refreshToken() {
    this.authService.refreshToken().subscribe((res: any) => {
      this.jwtcounter.stopTimer();
      this.jwtcounter.startTimer();
    })
  }
  
  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout().subscribe((response: any) => {
      this.jwtcounter.stopTimer();
      window.location.reload();
    })
  }
}
