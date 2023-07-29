import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  public loaded: boolean = false;
  public topBooks: {title: string, author: string, average: number}[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getTopThreeBooks().subscribe((response: any) => {
      this.topBooks = response;
      this.loaded = true;
    });
  }
  
}
