import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtCountdownService } from 'src/app/services/jwt-countdown.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.css']
})
export class LoginSidebarComponent {

  private user?: User | null;
  public seconds?: number | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtcounter: JwtCountdownService) {
      this.authService.user.subscribe(x => this.user = x); 
      this.jwtcounter.jwtCountdown.subscribe(x => this.seconds = x);
    }

  loggedIn() {
    if (this.seconds === 0) {
      this.logout();
      this.seconds = null;
    }
    if (this.user) return true;
    return false;
  }

  getUsername() {
    if (this.user) return this.user.username;
    return null;
  }

  refreshToken() {
    this.authService.refreshToken().subscribe();
  }
  
  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout().subscribe(x => window.location.reload())
  }

}
