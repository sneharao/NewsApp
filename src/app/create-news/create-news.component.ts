import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  @Input() isShowModal: boolean = false;
  @Output() onClickClose = new EventEmitter();
  @Output() onClickSubmit = new EventEmitter();

  newsForm = new FormGroup({
    boardId: new FormControl(''),
    author: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
   
  }
  onClickSubmitButton() {
   this.onClickSubmit.emit(this.newsForm.value);
  }
  onClickCloseButton() {
    this.onClickClose.emit('');
  }
}
