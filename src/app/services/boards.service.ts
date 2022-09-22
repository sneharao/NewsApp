import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, News, NewsType } from '../models/news.model';

export const NEWS_URL = 'http://localhost:8080/v1/news/';
export const BOARDS_URL = 'http://localhost:8080/v1/board';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  retriveAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(BOARDS_URL);
  }

  retrieveNewsByBoardId(boardId: string): Observable<NewsType> {
    return this.http.get<NewsType>('http://localhost:8080/v1/board/'+boardId+'/news');
  }

  createNews(enteredData: any) {
    return this.http.post('http://localhost:8080/v1/news',enteredData);
  }

  deleteNews(newsId: string) {
    return this.http.delete(NEWS_URL+newsId);
  }


  editNews(news: News) {
    return this.http.put(NEWS_URL,news);
  }

  postNewsTo(newsId: string, type:string) {
    let url = NEWS_URL+newsId;
    switch(type) {
      case 'draft': url += '/draft';
      break;
      case 'archive': url+= '/archive';
      break;
      case 'publish': url+= '/published';
      break;
    }
    return this.http.post(url,null);
  }

}
