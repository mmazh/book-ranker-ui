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
  public alreadyVoted: boolean = false;
  public books: { title: string, author: string, _id: number }[] = [];
  private votes: any;

  public voteForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[-a-zA-Z0-9]+$')]),
    book: new FormControl('', [
      Validators.required,
      Validators.minLength(1)]),
    stars: new FormControl(0, [
      Validators.required,
      Validators.min(1)])
  });

  get username() { return this.voteForm.get('username'); }

  get book() { return this.voteForm.get('book'); }

  get stars() { return this.voteForm.get('stars'); }


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
      this.createVotesHashMap(); // TODO move data formatting to service logic
    });
  }

  public onSubmit(): void {
    if (this.voteForm.invalid) return;
    let bookId = this.getBookId(this.voteForm.value.book);
    if (this.isDuplicateVoter()) {
      this.alreadyVoted = true;
      return;
    }
    let payload = {
      vote: this.voteForm.value.stars,
      user: this.voteForm.value.username
    };
    // this.bookService.createNewVote(bookId, payload).subscribe((response: any) => {
    //   console.log(response);
    // });
  }

  public updateVote() {
    console.log("inside update");
  }

  public cancelUpdate() {
    this.alreadyVoted = false;
    window.location.reload();
  }

  private isDuplicateVoter() {
    let bookId = this.getBookId(this.voteForm.value.book);
    if (this.votes[bookId] == undefined) {
      return false;
    }
    for (let vote of this.votes[bookId]) {
      if (vote.username == this.voteForm.value.username) {
        return true;
      }
    }
    return false;
  }

  // makes checking for duplicate votes in checkDuplicateVote() cheaper
  // TODO move this logic to book.service.ts
  private createVotesHashMap() {
    let votesDict: {[bookId: number]: { username: string, stars: number}[] } = {};
    for (let vote of this.votes) {
      if (votesDict[vote._bookId] == undefined) {
        votesDict[vote._bookId] = [];
      }
      votesDict[vote._bookId].push({username: vote.user, stars: vote.vote});
    }
    this.votes = votesDict;
  }

  private getBookId(titleAuthor: string | undefined | null) {
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
