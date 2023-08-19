import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  public loaded: boolean = false;
  public voteData: {title: string, author: string, votes: {username: string, stars: number}[]}[] = [];

  constructor(private bookService: BookService) { }

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
}
