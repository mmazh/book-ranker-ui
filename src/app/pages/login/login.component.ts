import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loggedIn: boolean = false;

  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[-a-zA-Z0-9]+$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)])
  });

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) return;
    let payload = { 
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.bookService.validateUser(payload).subscribe((response: any) => {
      this.loggedIn = response;
    })
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }
}
