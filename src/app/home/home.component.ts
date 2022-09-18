import { Component, OnInit } from '@angular/core';
import { Board } from '../models/news.model';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public boards: Board[];
  public noOfDrafts: number;
  public noOfPublished: number;
  public noOfArchives: number;
  public isError: boolean;
  public isLoading: boolean;

  constructor(private boardsService: BoardsService) {
    this.boards = [];
    this.noOfDrafts = 0;
    this.noOfArchives = 0;
    this.noOfPublished = 0;
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
    this.boardsService.retrieveNewsByBoardId(selectedBoardItem.id).subscribe(data => {
      const { drafts, published, archives } = data;
      this.noOfDrafts = drafts.length;
      this.noOfArchives = archives.length;
      this.noOfPublished = published.length;
      this.isError = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.isError = true;
    }, () => {
      this.isLoading = false;
    });
  }

}
