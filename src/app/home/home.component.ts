import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board, News } from '../models/news.model';
import { BoardsService } from '../services/boards.service';

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

  constructor(private boardsService: BoardsService, private router: Router) {
    this.boards = [];
    this.draftNews = [];
    this.publishedNews = [];
    this.archivedNews = [];
    this.modalValue = null;
    this.isError = false;
    this.isLoading = true;
    this.selectedNews = this.filteredNews();
  }

  ngOnInit(): void {
    this.boardsService.retriveAllBoards().subscribe(data => {
      this.isLoading = false;
      this.boards = data;
      this.onBoardItemClick(this.boards[0]);
    });
  }


  onBoardItemClick(selectedBoardItem: Board) {
    this.isLoading = true;
    this.boardsService.retrieveNewsByBoardId(selectedBoardItem.id).subscribe({
      next: (data) => {
        const { drafts, published, archives } = data;
        this.draftNews = drafts;
        this.publishedNews = published;
        this.archivedNews = archives;
        this.isError = false;
        this.selectedNews = this.filteredNews();
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
    this.selectedNews = this.filteredNews(value);
  }

  filteredNews(newsType?: string) {
    switch (newsType) {
      case 'draft':
        return this.draftNews;
      case 'published':
        return this.publishedNews;
      case 'archhived':
        return this.archivedNews;
      default:
        return this.draftNews;
    }
  }

  createNews(formValue: any) {
    this.isLoading = true;
    this.isShowCreateModal = false;
    if (!this.modalValue) {
      this.boardsService.createNews(formValue).subscribe({
        next: (data) => {
          console.log(data);
          this.onBoardItemClick(this.boards[0]);
        },
        error: (e) => {
          this.isLoading = false;
          this.isError = true;
        },
        complete: () => this.isLoading = false
      });
    } else {
      this.boardsService.editNews(formValue).subscribe(data => {
        this.onBoardItemClick(this.boards[0]);
      });
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
      this.boardsService.deleteNews(newsId).subscribe(data => {
        console.log(data);
        this.onBoardItemClick(this.boards[0]);
      });
    }
  }

}
