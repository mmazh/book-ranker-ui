import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  private books: any;
  private votes: any;

  public booksLoaded: boolean = false;
  public votesLoaded: boolean = false;
  public votesDict: {[bookId: number]: { username: string, score: number}[] } = {};

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe((response: any) => {
      this.books = response;
      this.booksLoaded = true;
    });

    this.bookService.getAllVotes().subscribe((response: any) => {
      this.votes = response;
      this.votesLoaded = true;
    });
  }

  public getArrayOfBookIds() {
    this.refreshVotesDict();
    let keys: number[] = [];
    for (var book of this.books) {
      if (this.votesDict[book._id] == undefined) {
        this.votesDict[book._id] = [];
      }
      keys.push(book._id);
    }
    return keys;
  }

  private refreshVotesDict() {
    this.votesDict = {};
    for (var singleVote of this.votes) {
      if (this.votesDict[singleVote._bookId] == undefined) {
        this.votesDict[singleVote._bookId] = [];
      }
      this.votesDict[singleVote._bookId].push({username: singleVote.user, score: singleVote.vote});
    }
  }


  public getTitleAuthorString(bookId: number) {
    for (var book of this.books) {
      if (book._id == bookId) {
        return `${book.title}, ${book.author}`;
      }
    }
    return ""
  }


}
