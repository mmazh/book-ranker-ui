import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  public booksLoaded: boolean = false;
  public votesLoaded: boolean = false;

  private rankings: { [bookId: string]: { titleAuthor: string, sumVotes: number, numVotes: number} } = {};
  private sortedRankings: { titleAuthor: string, score: number}[] = [];
  private books: any;
  private votes: any;

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

  private addBooksToRanking() {
    for (var book of this.books) {
      let bookTitleAuthor = `${book.title}, ${book.author}`;
      this.rankings[book._id] = { titleAuthor: bookTitleAuthor, sumVotes: 0, numVotes: 0};
    }
  }

  private addVotesToRanking() {
    for (var vote of this.votes) {
      this.rankings[vote._bookId].sumVotes += vote.vote;
      this.rankings[vote._bookId].numVotes += 1;
    }
  }

  private populateSortedRankings() {
    for (var book of this.books) {
      if (this.rankings[book._id].sumVotes) {
        let score = this.rankings[book._id].sumVotes / this.rankings[book._id].numVotes;
        score = Math.round(score * 100) / 100; // round to 2 decimal places
        this.sortedRankings.push({titleAuthor: this.rankings[book._id].titleAuthor, score: score});
      }
    }
    this.sortedRankings.sort((a, b) => b.score - a.score);
  }

  public calculateTopThreeBooks() {
    this.rankings = {};
    this.sortedRankings = [];
    this.addBooksToRanking();
    this.addVotesToRanking();
    this.populateSortedRankings();
    if (this.sortedRankings.length < 3) { 
      return this.sortedRankings; 
    }
    else { 
      return this.sortedRankings.slice(0, 3); 
    }
  }

}
