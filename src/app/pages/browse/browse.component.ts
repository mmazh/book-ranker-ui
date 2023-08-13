import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  public loaded: boolean = false;
  public voteData: {title: string, author: string, votes: {username: string, stars: number}[]}[] = [];

  constructor(private bookService: BookService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe((response: any) => {
      for (let book of response) {
        this.bookService.getAllVotesForBook(book.bookId).subscribe((response: any) => {
          this.voteData.push({title: book.title, author: book.author, votes: response});  
        });
      }
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
