import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptService implements HttpInterceptor {

  constructor() { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    const accessToken = localStorage.getItem("Access-Token");

    if (accessToken) {
      let cloned = httpRequest.clone({ 
        headers: httpRequest.headers.set("Authorization", "Bearer " + accessToken),
      });

      const authServer = "http://localhost:8081";
      const destination: string = httpRequest.url;
      if (destination.startsWith(authServer)) {
        cloned = cloned.clone({ withCredentials: true });
      }

      return next.handle(cloned);
    }

    return next.handle(httpRequest);
  }

}
