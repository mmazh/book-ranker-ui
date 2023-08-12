import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, payload: Object) {
    return this.http.post(url, payload);
  }

  put(url: string, payload: Object) {
    return this.http.put(url, payload);
  }

  delete(url: string) {
    return this.http.delete(url);
  }

}
