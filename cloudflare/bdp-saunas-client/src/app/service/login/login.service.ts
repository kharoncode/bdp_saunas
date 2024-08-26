import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, User_body } from '../type/users';
import host from '../host';

@Injectable({
   providedIn: 'root',
})
export class LoginService {
   url = `${host}/api/users`;

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

   postUser(body: User_body): Observable<User[]> {
      return this.http.post<User[]>(this.url, body);
   }

   editUser(body: { id: string; data: User_body }): Observable<User[]> {
      return this.http.patch<User[]>(this.url, body);
   }

   deleteUser(body: { id: string }): Observable<User[]> {
      return this.http.delete<User[]>(this.url, {
         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
         body: body,
      });
   }
}
