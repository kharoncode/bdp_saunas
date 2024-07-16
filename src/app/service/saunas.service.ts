import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saunas } from './saunas';

@Injectable({
  providedIn: 'root',
})
export class SaunasService {
  private host = 'https://kharon.alwaysdata.net';
  private saunasUrl = `${this.host}/api/saunas`;
  private isFullUrl = `${this.host}/api/isFull`;
  constructor(private http: HttpClient) {}
  options = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    }),
  };
  getSaunas(): Observable<Saunas[]> {
    return this.http.get<Saunas[]>(this.saunasUrl, this.options);
  }

  isFull(): Observable<{ isFull: boolean }> {
    return this.http.get<{ isFull: boolean }>(this.isFullUrl, this.options);
  }
}
