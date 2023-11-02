import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { JwtPayloadService } from 'src/app/helpers/jwt-payload.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  public userVotes: any[] = [];
  private userId: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private bookService: BookService,
    private jwtPayloadService: JwtPayloadService) {}

  ngOnInit() {
    const tokenPayload = this.jwtPayloadService.tokenPayload();
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
    this.authService.deleteAccount().subscribe((res: any) => {
      if (res.status !== 200) {
        window.alert("error deleting account");
      }
      this.router.navigate(['/']);
    })
  }

}
