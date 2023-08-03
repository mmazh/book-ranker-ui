import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private users: any[] = [];

  public newUserForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[-a-zA-Z0-9]+$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)])
  });

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getAllUsers().subscribe((response: any) => {
      this.users = response;
    });
  }

  public onSubmit(): void {
    if (this.newUserForm.invalid) return;
    if (this.userExists()) {
      window.alert("user already exists");
      window.location.reload();
    }
    let payload = { 
      username: this.newUserForm.value.username,
      password: this.newUserForm.value.password
    };
    this.bookService.createNewUser(payload).subscribe((response:any) => {
      console.log(response);
      this.router.navigate(['login']);
    })
  }

  private userExists() {
    let username = this.newUserForm.value.username?.toLowerCase();
    let check = this.users.find((x: any) => x.username.toLowerCase() === username);
    return typeof check !== "undefined";
  }

  get username() { return this.newUserForm.get('username'); }

  get password() { return this.newUserForm.get('password'); }
}
