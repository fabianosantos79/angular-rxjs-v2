import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interface';

@Injectable({
  providedIn: 'root'
})

export class LivroService {

  private readonly API: string = "https://www.googleapis.com/books/v1/volumes";

  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<Item[]>{
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, {params}).pipe(
      // tap(retornoAPI => {
      //   console.log("Fluxo TAP", retornoAPI)
      // }),
      map(response => response.items),
      // tap(response => console.log("Fluxo após o MAP", response))
      )
  }
}
