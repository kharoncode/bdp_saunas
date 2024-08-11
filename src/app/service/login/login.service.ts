import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../type/users';
import host from '../host';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = `${host}/users`;

  constructor(private http: HttpClient) {}
  options = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    }),
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.options);
  }

  postUser(body: User): Observable<User[]> {
    return this.http.post<User[]>(this.url, body);
  }
}
