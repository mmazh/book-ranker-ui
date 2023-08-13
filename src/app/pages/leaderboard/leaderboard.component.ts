import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  public loaded: boolean = false;
  public topBooks: {title: string, author: string, average: number}[] = [];

  constructor(private bookService: BookService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.bookService.getTopThreeBooks().subscribe((response: any) => {
      this.topBooks = response;
      this.loaded = true;
    });
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
