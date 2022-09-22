import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board, News } from '../models/news.model';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  @Input() newsForEdit?: News;
  @Input() boardList?: Board[];
  @Output() onClickClose = new EventEmitter();
  @Output() onClickSubmit = new EventEmitter();
  title = '';

  newsForm = new FormGroup({
    boardId: new FormControl('',[Validators.required]),
    author: new FormControl('',[Validators.required,Validators.email]),
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    imageURL: new FormControl('',[Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
    if (this.newsForEdit) {
      this.title = 'Edit News';
      this.newsForm.patchValue(this.newsForEdit);
    } else {
      this.title = 'Create News';
      const loggedInUserId = sessionStorage.getItem('userId');
      this.newsForm.patchValue({ author: loggedInUserId })
    }
  }
  onClickSubmitButton() {
    if(this.newsForm.valid) {
      if (this.newsForEdit) {
        this.onClickSubmit.emit({ ...this.newsForm.value, id: this.newsForEdit.id });
      } else {
        this.onClickSubmit.emit(this.newsForm.value);
      }
    } else {
      alert('Please enter valid values');
    }
  }
  onClickCloseButton() {
    this.onClickClose.emit('');
  }
}
