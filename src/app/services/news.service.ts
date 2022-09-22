import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, News, NewsType } from '../models/news.model';

export const NEWS_URL = 'http://localhost:8080/v1/news/';
export const BOARDS_URL = 'http://localhost:8080/v1/board';

/**
 * NewsService is used for all the api calls made using http client
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  /**
   * retriveAllBoards makes the api call to retrieve the board list 
   * @returns the list of boards
   */
  retriveAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(BOARDS_URL);
  }

  /**
   * retrieveNewsByBoardId makes the api call to get the list of news of the selected board
   * @param boardId the selected board
   * @returns an object with drafts, published and archived news of the board
   */

  retrieveNewsByBoardId(boardId: string): Observable<NewsType> {
    return this.http.get<NewsType>('http://localhost:8080/v1/board/'+boardId+'/news');
  }

  /**
   * createNews makes the post api call to create news
   * @param enteredData contains news attributes to be created like:
   *  author, title, descrition and imageUr; 
   * @returns the newly created news
   */
  createNews(enteredData: any) {
    return this.http.post('http://localhost:8080/v1/news',enteredData);
  }

  /**
   * deleteNews deletes the news matching the newsId passed
   * @param newsId id of the news to be deleted
   */
  deleteNews(newsId: string) {
    return this.http.delete(NEWS_URL+newsId);
  }

  /**
   * editNews makes the put api call to update the news
   * @param news news object to be updated
   */
  editNews(news: News) {
    return this.http.put(NEWS_URL,news);
  }

  /**
   * postNewsTo calls the post api , to move the news to different category 
   * eg: archive a news
   * @param newsId id of the news to be moved
   * @param type which category of the news to be moved to
   */
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
