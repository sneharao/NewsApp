import { Component, OnInit } from '@angular/core';
import { Board } from '../models/news.model';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public boards: Board[] = [];
  constructor(private boardsService: BoardsService) {
    this.boards = [];
   }

  ngOnInit(): void {
    this.boardsService.retriveAllBoards().subscribe(data=>{
      this.boards = data;
    })
  }

}
