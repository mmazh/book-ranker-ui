import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { JwtPayloadService } from 'src/app/helpers/jwt-payload.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  public books: any;
  public loaded: boolean = false;
  private votes: any;
  private user?: User | null;

  public voteForm = new FormGroup({
    book: new FormControl('', [Validators.required]),
    stars: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private bookService: BookService, private authService: AuthService) {
    this.authService.user.subscribe(x => this.user = x); 
  }

  ngOnInit(): void {
    if (!this.user) return;
    this.bookService.getAllBooks().subscribe((b: any) => {
      this.books = b;
      if (!this.user?.userId) return;
      this.bookService.getAllVotesForUser(this.user.userId).subscribe((v: any) => {
        this.votes = v;
        this.loaded = true;
      });
    });
  }

  public onSubmit(): void {
    if (this.voteForm.invalid) return;
    let payload = this.createPayload();
    if (!payload) return;
    let voteId = this.findExistingVoteId(payload);
    if (voteId) {
      this.updateVote(payload, voteId);
    } else {
      this.bookService.createNewVote(payload).subscribe(x => window.location.reload());
    }
  }

  private updateVote(payload: Object, voteId: number) {
    if (window.confirm("You already voted on this book. Update existing vote?")) {
      this.bookService.updateVote(voteId, payload).subscribe(x => window.location.reload());
    }
  }

  private createPayload() {
    let bookId = this.findBookId(this.voteForm.value.book);
    if (!this.user || !this.user.userId) return null;
    return { bookId: bookId, userId: this.user.userId, stars: this.voteForm.value.stars };
  }

  private findExistingVoteId(payload: {bookId: string, userId: number | null | undefined}) {
    return this.votes.find((x: any) => x.userId === payload.userId && x.bookId === payload.bookId)?.voteId;
  }

  private findBookId(titleAuthor: string | null | undefined) {
    return this.books.find((x: any) => `${x.title}, ${x.author}` === titleAuthor)?.bookId;
  }

}
