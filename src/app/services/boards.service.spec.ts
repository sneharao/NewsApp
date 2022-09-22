import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BoardsService, BOARDS_URL, NEWS_URL } from './boards.service';

const mockNewsForEdit = {"id":"5c22df","boardId":"de","author":"slds@dfjk.com","title":"Panel says US adults should get routine screening for anxiety","description":"The draft guidance comes amid a surge in mental health concerns following the Covid-19 pandemic.","imageURL":"https://ichef.bbci.co.uk/news/1024/branded_news/AB8F/production/_126791934_gettyimages-1327080394-1-1.jpg","status":"draft","CreatedAt":"2022-09-21T13:03:40.041100337Z"};

describe('BoardsService', () => {
  let service: BoardsService;
  let httpClientSpy = jasmine.createSpyObj("HttpClient", ['get', 'post', 'put', 'delete']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide :HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(BoardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on call of retriveAllBoards, httpclient get method is called',()=>{
    service.retriveAllBoards();
    expect(httpClientSpy.get).toHaveBeenCalledWith(BOARDS_URL);
  });

  it('on call of retrieveNewsByBoardId, httpclient get method is called along with newdId in url',()=>{
    service.retrieveNewsByBoardId('en');
    expect(httpClientSpy.get).toHaveBeenCalledWith(BOARDS_URL+'/en'+'/news');
  });

  it('on call of createNews, httpclient post method is called',()=>{
    service.createNews({title:'',description:''});
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('on call of deleteNews, httpclient delete method is called with id of news to be deleted',()=>{
    service.deleteNews('#test');
    expect(httpClientSpy.delete).toHaveBeenCalledWith('http://localhost:8080/v1/news/#test');
  });
  it('on call of editNews, httpclient put method is called with the obj of news to be edited',()=>{
    service.editNews(mockNewsForEdit);
    expect(httpClientSpy.put).toHaveBeenCalledWith(NEWS_URL,mockNewsForEdit);
  });
  it('on call of moveNewsTo, httpclient get method is called',()=>{
    const newsId = 'testNewsId';
    service.postNewsTo(newsId,'draft');
    expect(httpClientSpy.post).toHaveBeenCalledWith(NEWS_URL+newsId+'/draft',null);
    service.postNewsTo(newsId,'archive');
    expect(httpClientSpy.post).toHaveBeenCalledWith(NEWS_URL+newsId+'/archive',null);
    service.postNewsTo(newsId,'publish');
    expect(httpClientSpy.post).toHaveBeenCalledWith(NEWS_URL+newsId+'/published',null);
  });
  
});
