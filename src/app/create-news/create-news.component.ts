import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { News } from '../models/news.model';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  @Input() newsForEdit?: News;
  @Output() onClickClose = new EventEmitter();
  @Output() onClickSubmit = new EventEmitter();
  title = '';

  newsForm = new FormGroup({
    boardId: new FormControl(''),
    author: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    imageURL: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
    if (this.newsForEdit) {
      this.title = 'Edit News';
      this.newsForm.patchValue(this.newsForEdit);
    } else {
      this.title = 'Create News'; 
    }
  }
  onClickSubmitButton() {
    if (this.newsForEdit) {
      this.onClickSubmit.emit({ ...this.newsForm.value, id: this.newsForEdit.id });
    } else {
      this.onClickSubmit.emit(this.newsForm.value);
    }
  }
  onClickCloseButton() {
    this.onClickClose.emit('');
  }
}
