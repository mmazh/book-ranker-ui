import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public invalidLoginAttempt: boolean = false;
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.tokenExpired()) {
      this.router.navigate(['account']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    let payload = { 
      username: this.loginForm.value.username,
      password: this.loginForm.value.password 
    };
    this.authService.login(payload).subscribe({ 
      error: (e) => {
        this.invalidLoginAttempt = true;
        this.loginForm.reset();
      },
      complete: () => {
        this.router.navigate(['account']);
      }
    })
  }

}
