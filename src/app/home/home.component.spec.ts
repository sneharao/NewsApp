import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateNewsComponent } from '../create-news/create-news.component';
import { FormatDatePipe } from '../pipes/format-date.pipe';
import { NewsService } from '../services/news.service';

import { HomeComponent } from './home.component';
const mockBoardResponse = [{ "id": "en", "name": "England" }, { "id": "de", "name": "Deutsch" }];
const mockNewsItemResponse = {"drafts":[{"id":"5c22dfcd-3f32-bab0-5b1a-209864d99a9a","boardId":"de","author":"slds@dfjk.com","title":"Panel says US adults should get routine screening for anxiety","description":"The draft guidance comes amid a surge in mental health concerns following the Covid-19 pandemic.","imageURL":"https://ichef.bbci.co.uk/news/1024/branded_news/AB8F/production/_126791934_gettyimages-1327080394-1-1.jpg","status":"draft","CreatedAt":"2022-09-21T13:03:40.041100337Z"},{"id":"b3463383-03dc-73a7-34c5-60a3b8ee0a94","boardId":"de","author":"slds@dfjk.com","title":"Recession: Is the US heading into an 'ugly' downturn?","description":"With stocks tanking and grocery bills high, many Americans feel like the economy is in a recession.","imageURL":"https://ichef.bbci.co.uk/news/1024/branded_news/E771/production/_126794295_gettyimages-1241332610.jpg","status":"draft","CreatedAt":"2022-09-21T13:06:34.928521341Z"},{"id":"b0f0bf81-4b6f-c6d5-1aa7-55ddaf168470","boardId":"de","author":"slds@dfjk.com","title":"Golden Globes returning to TV in 2023 after diversity row","description":"The award show was dropped by its US broadcaster last year over major diversity and ethics concerns.","imageURL":"https://ichef.bbci.co.uk/news/1024/branded_news/EC21/production/_126794406_gettyimages-1363723613.jpg","status":"draft","CreatedAt":"2022-09-21T13:07:45.881910505Z"}],"published":[],"archives":[{"id":"e5c97a69-98a1-49f5-5f02-91f902b928af","boardId":"de","author":"slds@dfjk.com","title":"US detentions at Mexico border pass two million a year for first time","description":"The rising number is a politically contentious issue ahead of the midterm elections in November.","imageURL":"https://ichef.bbci.co.uk/news/1024/branded_news/183C7/production/_126717299_detainedmigrants.jpg","status":"archived","CreatedAt":"2022-09-21T07:35:41.073022451Z"},{"id":"98e7a1bd-c529-f12e-e904-9d3a21162a90","boardId":"de","author":"slds@dfjk.com","title":"US charges dozens with $250m pandemic relief fraud","description":"The accused allegedly used the proceeds to buy luxury cars and property in the US, Kenya and Turkey.","imageURL":"","status":"archived","CreatedAt":"2022-09-21T13:04:40.639697808Z"}]};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let newsServiceSpy = jasmine.createSpyObj("NewsService", ['retriveAllBoards', 'retrieveNewsByBoardId', 'createNews', 'editNews', 'deleteNews', 'postNewsTo']);
  newsServiceSpy.retriveAllBoards.and.returnValue(of(mockBoardResponse));
  newsServiceSpy.retrieveNewsByBoardId.and.returnValue(of({"drafts":[],"published":[],"archives":[]}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule],
      declarations: [HomeComponent, FormatDatePipe, CreateNewsComponent],
      providers: [{ provide: NewsService, useValue: newsServiceSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two boards displayed on response to get all boards api', () => {
    expect(component.boards.length).toBe(2);
    mockBoardResponse.push({ "id": "it", "name": "Italian" })
    newsServiceSpy.retriveAllBoards.and.returnValue(of(mockBoardResponse));
    fixture.detectChanges();
    expect(component.boards.length).toBe(3);
  });

  it('should show empty block when on click of board , service gives empty newslist', () => {
    newsServiceSpy.retrieveNewsByBoardId.and.returnValue(of({"drafts":[],"published":[],"archives":[]}));
    component.onBoardItemClick({ id: "it", name: "Italian" });
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.alignCenter').textContent)
    .toBe('No News Present , create to view this section ');
  });

  it('should show error block when on click of board , service gives error', () => {
    newsServiceSpy.retrieveNewsByBoardId.and.returnValue(throwError(()=>new Error('unavailable')));
    component.onBoardItemClick({ id: "la", name: "Latin" });
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.alignCenter').textContent)
    .toBe('An error has occured ');
  });

  it('should show news block when on click of board , service returns 3 news items', () => {
    newsServiceSpy.retrieveNewsByBoardId.and.returnValue(of(mockNewsItemResponse));
    component.onBoardItemClick({ id: "la", name: "Latin" });
    component.selectedNewsType = 'draft';
    fixture.detectChanges();
    
    expect(component.selectedNews.length).toBe(3);
  });

  it('should show default draft news initially, service returns 3 draft news', () => {
    newsServiceSpy.retrieveNewsByBoardId.and.returnValue(of(mockNewsItemResponse));
    component.onBoardItemClick({ id: "la", name: "Latin" });
    fixture.detectChanges();

    expect(component.selectedNewsType).toBe('draft');
    expect(component.selectedNews.length).toBe(3);
  });

  it('should show published news when user selects published from dropdown , service returns no publish news items', () => {
    newsServiceSpy.retrieveNewsByBoardId.and.returnValue(of(mockNewsItemResponse));
    component.onBoardItemClick({ id: "la", name: "Latin" });
    component.onSelectNewsType({ target: { value:"published" } });
    fixture.detectChanges();

    expect(component.selectedNewsType).toBe('published');
    expect(component.selectedNews.length).toBe(0);
  });

  it('should show news when user selects archive from dropdown , service returns 2 archive news items', () => {
    newsServiceSpy.retrieveNewsByBoardId.and.returnValue(of(mockNewsItemResponse));
    component.onBoardItemClick({ id: "la", name: "Latin" });
    component.onSelectNewsType({ target: { value:"archived" } });
    fixture.detectChanges();

    expect(component.selectedNewsType).toBe('archived');
    expect(component.selectedNews.length).toBe(2);
  });
  
  it('create modal should open on click of create button', () => {
    const createButton = fixture.debugElement.nativeElement.querySelector('#createNews');
    createButton.click();
    fixture.detectChanges();
    expect(component.isShowCreateModal).toBeTruthy();
  });

  it('edit modal should open on click of edit button of news and should have selected news values', () => {
    component.onClickEditNews(mockNewsItemResponse.drafts[0]);    
    fixture.detectChanges();

    expect(component.isShowCreateModal).toBeTruthy();
    expect(component.modalValue).toBe(mockNewsItemResponse.drafts[0]);
  });

  it('on click of delete button of news and should delete news by calling delete api', () => {
    newsServiceSpy.deleteNews.and.returnValue(of({}));
    component.onDeleteNews(mockNewsItemResponse.drafts[0].id);    
    fixture.detectChanges();
    const confirm = spyOn(window,'confirm');
    confirm.and.returnValue(true);
    expect(newsServiceSpy.deleteNews).toHaveBeenCalled();
  });

  it('on click of delete button of news and should show confirm dialog', () => {
    newsServiceSpy.postNewsTo.and.returnValue(of({}));
    component.onMoveNewsToDifferentType(mockNewsItemResponse.drafts[0].id, 'archive');    
    fixture.detectChanges();
    expect(newsServiceSpy.postNewsTo).toHaveBeenCalled();
  });

  it('on call of closeModal should close modal and reset modalValue', () => {
    component.closeModal();
    expect(component.isShowCreateModal).toBeFalsy();
    expect(component.modalValue).toBe(null);
  });

  it('on call of createNews should create news using news api', () => {
    newsServiceSpy.createNews.and.returnValue(of({}));
    component.createNews(mockNewsItemResponse.drafts[0]);
    expect(newsServiceSpy.createNews).toHaveBeenCalled();
  });

  it('on call of createNews with updated valued should edit news using news api', () => {
    newsServiceSpy.editNews.and.returnValue(of({}));
    component.modalValue = {...mockNewsItemResponse.drafts[0], title: 'Updated title'}
    component.createNews(mockNewsItemResponse.drafts[0]);
    expect(newsServiceSpy.editNews).toHaveBeenCalled();
  });

});
