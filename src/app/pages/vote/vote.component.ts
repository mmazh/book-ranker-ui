import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  public books: any;
  private votes: any;
  private users: any;

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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((response: any) => {
      this.books = response;
    });
    this.bookService.getAllVotes().subscribe((response: any) => {
      this.votes = response;
    });
    this.bookService.getAllUsers().subscribe((response: any) => {
      this.users = response;
    });
  }

  public onSubmit(): void {
    if (this.voteForm.invalid) return;
    let payload = this.createPayload();
    if (typeof payload.userId === "undefined") {
      window.alert("User does not exist. (change this laster)");
      return;
    }
    let voteId = this.findExistingVoteId(payload);
    if (typeof voteId !== "undefined") this.updateVote(payload, voteId);
    else
    {
      this.bookService.createNewVote(payload).subscribe((response: any) => {
        console.log(response);
        window.location.reload();
      });
    }
  }

  private updateVote(payload: Object, voteId: number) {
    if (window.confirm("You already voted on this book. Update existing vote?")) {
      this.bookService.updateVote(voteId, payload).subscribe((response: any) => {
        console.log(response);
      });
    }
    window.location.reload();
  }

  private createPayload() {
    let bookId = this.findBookId(this.voteForm.value.book);
    let userId = this.findUserId(this.voteForm.value.username);
    return {
      bookId: bookId,
      userId: userId,
      stars: this.voteForm.value.stars
    };
  }

  private findExistingVoteId(payload: {bookId: string, userId: string}) {
    return this.votes.find((x: any) => x.userId === payload.userId && x.bookId === payload.bookId)?.voteId;
  }

  private findUserId(username: string | null | undefined) {
    return this.users.find((x: any) => x.username === username)?.userId;
  }

  private findBookId(titleAuthor: string | null | undefined) {
    return this.books.find((x: any) => `${x.title}, ${x.author}` === titleAuthor)?.bookId;
  }

  get username() { return this.voteForm.get('username'); }

  get book() { return this.voteForm.get('book'); }

  get stars() { return this.voteForm.get('stars'); }

}
