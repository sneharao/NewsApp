import { Component, OnInit } from '@angular/core';
import { Board, News } from '../models/news.model';
import { BoardsService } from '../services/boards.service';

type Nullable<T> = T | null;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public boards: Board[];
  public draftNews: News[];
  public publishedNews: News[];
  public archivedNews: News[];
  public isError: boolean;
  public isLoading: boolean;
  selectedNews: News[];
  isShowCreateModal = false;
  modalValue: News | any;
  selectedNewsType = 'draft';
  selectedBoard:Nullable<Board> = null;

  constructor(private boardsService: BoardsService) {
    this.boards = [];
    this.draftNews = [];
    this.publishedNews = [];
    this.archivedNews = [];
    this.modalValue = null;
    this.isError = false;
    this.isLoading = true;
    this.selectedNews = this.filteredNews(this.selectedNewsType);
  }

  ngOnInit(): void {
    this.boardsService.retriveAllBoards().subscribe(data => {
      this.isLoading = false;
      this.boards = data;
      this.selectedBoard = this.boards[0];
      this.onBoardItemClick(this.selectedBoard);
    });
  }


  onBoardItemClick(selectedBoardItem: Nullable<Board>) {
    this.isLoading = true;
    if(!selectedBoardItem) {
      return;
    }
    this.selectedBoard = selectedBoardItem;
    this.boardsService.retrieveNewsByBoardId(selectedBoardItem.id).subscribe({
      next: (data) => {
        const { drafts, published, archives } = data;
        this.draftNews = drafts;
        this.publishedNews = published;
        this.archivedNews = archives;
        this.isError = false;
        this.selectedNews = this.filteredNews(this.selectedNewsType);
      },
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
      },
      complete: () => this.isLoading = false
    });
  }

  filterByNewsType(event: any) {
    const { target: { value } } = event;
    console.log(value);
    this.selectedNews = this.filteredNews(value);
  }

  filteredNews(newsType?: string) {
    switch (newsType) {
      case 'draft':
        return this.draftNews;
      case 'published':
        return this.publishedNews;
      case 'archived':
        return this.archivedNews;
      default:
        return this.draftNews;
    }
  }

  responseHandler = {
    next: (x: any) => this.onBoardItemClick(this.selectedBoard),
    error: (error:any) => {
      this.isLoading = false;
      this.isError = true;
    },
    complete: () => this.isLoading = false,
  };

  createNews(formValue: any) {
    this.isLoading = true;
    this.isShowCreateModal = false;
    if (!this.modalValue) {
      this.boardsService.createNews(formValue).subscribe(this.responseHandler);
    } else {
      this.boardsService.editNews(formValue).subscribe(this.responseHandler);
    }
  }

  onClickEditNews(itemValue: News) {
    this.isShowCreateModal = true;
    this.modalValue = itemValue;
  }

  closeModal() {
    this.isShowCreateModal = false;
    this.modalValue = null;
  }

  onDeleteNews(newsId: string) {
    if(confirm("Are you sure to delete? ")) {
      this.boardsService.deleteNews(newsId).subscribe(this.responseHandler);
    }
  }

  onMoveNewsToDifferentType(newsId: string,type: string) {
    this.boardsService.postNewsTo(newsId,type).subscribe(this.responseHandler);
  }

}
