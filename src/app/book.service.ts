import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly ROOT_URL;

  constructor(private webReqService: WebRequestService) { 
    this.ROOT_URL = 'http://localhost:8080';
  }

  getAllBooks() {
    return this.webReqService.get(`${this.ROOT_URL}/book`);
  }

  getAllVotes() {
    return this.webReqService.get(`${this.ROOT_URL}/votes`);
  }

  getAllUsers() {
    return this.webReqService.get(`${this.ROOT_URL}/login/users`);
  }

  getTopThreeBooks() {
    return this.webReqService.get(`${this.ROOT_URL}/book/top3`);
  }

  getAllVotesForUser(userId: number) {
    return this.webReqService.get(`${this.ROOT_URL}/votes/user/${userId}`);
  }

  getAllVotesForBook(bookId: number) {
    return this.webReqService.get(`${this.ROOT_URL}/votes/book/${bookId}`);
  }

  createNewVote(payload: Object) {
    return this.webReqService.post(`${this.ROOT_URL}/votes`, payload);
  }

  createNewBook(payload: Object) {
    return this.webReqService.post(`${this.ROOT_URL}/book`, payload);
  }

  createNewUser(payload: Object) {
    return this.webReqService.post(`${this.ROOT_URL}/login/new`, payload);
  }

  updateVote(voteId: number, payload: Object) {
    return this.webReqService.put(`${this.ROOT_URL}/votes/${voteId}`, payload);
  }

  deleteVote(voteId: number) {
    return this.webReqService.delete(`${this.ROOT_URL}/votes/${voteId}`);
  }

}
