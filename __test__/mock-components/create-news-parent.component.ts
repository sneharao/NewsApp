import { Component } from "@angular/core";
import { News } from "src/app/models/news.model";

const mockNewsToEdit = {
    "id": "5c22dfcd-3f32-bab0-5b1a-209864d99a9a",
    "boardId": "de",
    "author": "slds@dfjk.com",
    "title": "Panel says US adults should get routine screening for anxiety",
    "description": "The draft guidance comes amid a surge in mental health concerns following the Covid-19 pandemic.",
    "imageURL": "https://ichef.bbci.co.uk/news/1024/branded_news/AB8F/production/_126791934_gettyimages-1327080394-1-1.jpg",
    "status": "draft",
    "CreatedAt": "2022-09-21T13:03:40.041100337Z"
  };
  
@Component({
    selector: 'parent-stub',
    template: `<app-create-news *ngIf="isShowCreateModal" [newsForEdit]=value (onClickClose)="closeModal()" (onClickSubmit)="createNews($event)" [boardList]="boards">
    </app-create-news>`
  })
  
  export class ParentStubComponent  {
    value: News | any = mockNewsToEdit;
    constructor() { }
    isShowCreateModal = true;
    boards = [];
  
    closeModal() {
  
    }
    createNews(eventValue: any) {
     console.log(eventValue);
    }
  
  }