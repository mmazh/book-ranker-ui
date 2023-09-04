import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/book.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  public books: any;
  public loaded: boolean = false;
  private votes: any;
  private userId: number = -1;

  public voteForm = new FormGroup({
    book: new FormControl('', [Validators.required]),
    stars: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private bookService: BookService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.tokenExpired()) this.router.navigate(['login']);
    const tokenPayload = this.authService.tokenPayload();
    if (!tokenPayload) return;
    this.userId = tokenPayload['userid'];
    this.bookService.getAllBooks().subscribe((response: any) => {
      this.books = response;
      this.bookService.getAllVotesForUser(this.userId).subscribe((response: any) => {
        this.votes = response;
        this.loaded = true;
      });
    });
  }

  public onSubmit(): void {
    if (this.voteForm.invalid) return;
    let payload = this.createPayload();
    let voteId = this.findExistingVoteId(payload);
    if (voteId) {
      this.updateVote(payload, voteId);
      return;
    }
    this.bookService.createNewVote(payload).subscribe((response: any) => {
      window.location.reload();
    });
  }

  private updateVote(payload: Object, voteId: number) {
    if (window.confirm("You already voted on this book. Update existing vote?")) {
      this.bookService.updateVote(voteId, payload).subscribe((response: any) => {
        window.location.reload();
      });
    }
  }

  private createPayload() {
    let bookId = this.findBookId(this.voteForm.value.book);
    return { bookId: bookId, userId: this.userId, stars: this.voteForm.value.stars };
  }

  private findExistingVoteId(payload: {bookId: string, userId: number}) {
    return this.votes.find((x: any) => x.userId === payload.userId && x.bookId === payload.bookId)?.voteId;
  }

  private findBookId(titleAuthor: string | null | undefined) {
    return this.books.find((x: any) => `${x.title}, ${x.author}` === titleAuthor)?.bookId;
  }

}
