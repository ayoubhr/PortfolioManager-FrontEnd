import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {

  constructor(private http: HttpClient) { }

  getAssets(): Observable<any> {
    return this.http.get<any>("https://api.coingecko.com/api/v3/coins").pipe(
      map((response) => response),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            new Error(`Error getting
            events. Status: ${resp.status}. Message: ${resp.message}`)
        )
      )
    );
  }

  getAsset(id: string): Observable<any> {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${id}`).pipe(
      map((response) => response),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            new Error(`Error getting
            events. Status: ${resp.status}. Message: ${resp.message}`)
        )
      )
    );
  }
}
