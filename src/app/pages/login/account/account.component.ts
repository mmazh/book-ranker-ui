import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { JwtCountdownService } from 'src/app/services/jwt-countdown.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  public userVotes: any[] = [];
  private userId: number = 0;

  constructor(private authService: AuthService, private router: Router, private bookService: BookService, private jwtCounter: JwtCountdownService) {}

  ngOnInit() {
    const tokenPayload = this.authService.tokenPayload();
    this.userId = tokenPayload['userid'];
    this.bookService.getAllVotesForUser(this.userId).subscribe((response: any) => {
      this.userVotes = response;
    });
  }

  deleteVote($event: any) {
    if (typeof $event === "number") {
      this.bookService.deleteVote($event).subscribe((response: any) => {
        window.location.reload();
      });
    }
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe((deleteResponse: any) => {
      this.jwtCounter.stopTimer();
      this.authService.logout().subscribe((logoutResponse: any) => {
        if (deleteResponse.status !== 200 || logoutResponse.status !== 200) {
          window.alert("error");
        } else {
          window.alert("successfully deleted");
        }
        this.router.navigate(['/']);
      })
    })
  }

}
