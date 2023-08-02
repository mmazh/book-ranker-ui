import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private webReqService: WebRequestService) { }

  getAllBooks() {
    return this.webReqService.get('book');
  }

  getTopThreeBooks() {
    return this.webReqService.get(`book/top3`);
  }

  getAllVotesForUser(userId: number) {
    return this.webReqService.get(`votes/user/${userId}`);
  }

  getAllVotesForBook(bookId: number) {
    return this.webReqService.get(`votes/book/${bookId}`);
  }

  getAllVotes() {
    return this.webReqService.get(`votes`);
  }

  getAllUsers() {
    return this.webReqService.get(`login/users`);
  }

  createNewVote(payload: Object) {
    return this.webReqService.post(`votes`, payload);
  }

  createNewBook(payload: Object) {
    return this.webReqService.post(`book`, payload);
  }

  updateVote(voteId: number, payload: Object) {
    return this.webReqService.put(`votes/${voteId}`, payload);
  }

}
