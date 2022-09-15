import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  retriveAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('http://localhost:8080/v1/board');
  }
}
