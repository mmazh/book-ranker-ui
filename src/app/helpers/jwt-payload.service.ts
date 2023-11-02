import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtPayloadService {

  constructor() { }

  calculateRemainingJwtTime() {
    const payload = this.tokenPayload();
    if (payload) return payload.exp - Math.floor((new Date).getTime() / 1000);
    return 0;
  }

  tokenPayload() {
    const token = localStorage.getItem("Access-Token");
    if (token) return JSON.parse(atob(token.split('.')[1]));
    return null;
  }
  
}
