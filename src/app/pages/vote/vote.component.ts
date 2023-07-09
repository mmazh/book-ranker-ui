import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  public booksLoaded: boolean = false;
  public votesLoaded: boolean = false;
  public isSubmitted: boolean = false;
  // user name cant have spaces or special chars except -, numbers ok, uppercase and lower are the same
  
  public books: { title: string, author: string, _id: number }[] = [];
  private votes: any;

  public voteForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    book: new FormControl(''),
    stars: new FormControl('')
  });

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((response: any) => {
      this.books = response;
      this.sortBooksAlphabetically();
      this.booksLoaded = true;
    });

    this.bookService.getAllVotes().subscribe((response: any) => {
      this.votes = response;
      this.votesLoaded = true;
    });
  }

  public getBooks() {
    let titleAuthor: string[] = [];
    for (var book of this.books) {
      titleAuthor.push(`${book.title}, ${book.author}`);
    }
    return titleAuthor;
  }

  public onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.voteForm.value);
  }

  private getBookId(titleAuthor: string) {
    for (var book of this.books) {
      if (`${book.title}, ${book.author}` == titleAuthor) {
        return book._id;
      }
    }
    return -1;
  }

  private sortBooksAlphabetically() {
    this.books.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

}
