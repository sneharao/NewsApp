import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, NewsType } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  retriveAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('http://localhost:8080/v1/board');
  }

  retrieveNewsByBoardId(boardId: string): Observable<NewsType> {
    return this.http.get<NewsType>('http://localhost:8080/v1/board/'+boardId+'/news');
  }
}
