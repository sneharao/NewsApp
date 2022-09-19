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

  constructor(private boardsService: BoardsService, private router: Router) {
    this.boards = [];
    this.draftNews = [];
    this.publishedNews = [];
    this.archivedNews = [];
    this.isError = false;
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.boardsService.retriveAllBoards().subscribe(data => {
      this.isLoading = false;
      this.boards = data;
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
      },
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
      },
      complete: () => this.isLoading = false
    });
  }
}
