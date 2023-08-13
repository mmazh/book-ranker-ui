import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { BookService } from 'src/app/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  public userVotes: any[] = [];
  private userId: number = 0;

  constructor(private authService: AuthService, private router: Router, private bookService: BookService) {}

  ngOnInit() {
    if (this.authService.tokenExpired()) this.router.navigate(['login']);
    const tokenPayload = this.authService.tokenPayload();
    this.userId = tokenPayload['userid'];
    this.bookService.getAllVotesForUser(this.userId).subscribe((response: any) => {
      this.userVotes = response;
    });
  }

  deleteVote($event: any) {
    console.log($event);
    console.log(typeof $event);
    if (typeof $event === "number") {
      this.bookService.deleteVote($event).subscribe((response: any) => {
        window.location.reload();
      });
    }
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe({
      error: (e) => window.alert("error deleting account"),
      complete: () => this.authService.logout().subscribe({
        error: (e) => window.alert("error logging out of account"),
        complete: () => this.router.navigate(['login'])
      })
    })
  }

  loggedIn() {
    return !this.authService.tokenExpired();
  }
  
  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout().subscribe((response: any) => {
      window.location.reload();
    })
  }

}
