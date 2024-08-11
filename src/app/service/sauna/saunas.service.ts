import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sauna, Sauna_body } from '../type/sauna';

@Injectable({
  providedIn: 'root',
})
export class SaunasService {
  private host = 'https://kharon.alwaysdata.net';
  private saunasUrl = `${this.host}/api/saunas`;
  private isFullUrl = `${this.host}/api/isfull`;
  constructor(private http: HttpClient) {}
  options = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    }),
  };
  getSaunas(): Observable<Sauna[]> {
    return this.http.get<Sauna[]>(this.saunasUrl, this.options);
  }

  postSauna(body: Sauna_body): Observable<Sauna[]> {
    return this.http.post<Sauna[]>(this.saunasUrl, body);
  }

  isFull(): Observable<{ isFull: boolean }> {
    return this.http.get<{ isFull: boolean }>(this.isFullUrl, this.options);
  }
}
