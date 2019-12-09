import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/Common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  register(body) {
    return this.http.post('http://localhost:3000/saveimage', body);
  }
}
