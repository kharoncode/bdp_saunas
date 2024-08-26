import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sauna, Sauna_body } from '../type/sauna';
import host from '../host';

@Injectable({
  providedIn: 'root',
})
export class SaunasService {
  private saunasUrl = `${host}/api/saunas`;
  private isFullUrl = `${host}/api/isfull`;
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

  editSauna(body: { id: number; data: Sauna_body }): Observable<Sauna[]> {
    return this.http.patch<Sauna[]>(this.saunasUrl, body);
  }

  deleteSauna(body: { id: number }): Observable<Sauna[]> {
    return this.http.delete<Sauna[]>(this.saunasUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body,
    });
  }

  isFull(): Observable<{ isFull: boolean }> {
    return this.http.get<{ isFull: boolean }>(this.isFullUrl, this.options);
  }
}
