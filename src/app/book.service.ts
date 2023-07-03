import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private webReqService: WebRequestService) { }

  getAllBooks() {
    return this.webReqService.get('books');
  }

  getAllVotes() {
    return this.webReqService.get(`votes`);
  }

}
