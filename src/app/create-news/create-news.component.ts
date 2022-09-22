import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board, News } from '../models/news.model';

/**
 * Modal which helps in creating/editing of news item
 */
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

  // Form to be filled with all mandatory details for news to be created
  newsForm = new FormGroup({
    boardId: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
  });

  constructor() { }

  // Set title to edit if news value comes from parent screen else set to create
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

  /**
   * onClickSubmitButton called on click of submit button , after user is done with the form
   */
  onClickSubmitButton() {
    if (this.newsForm.valid) {
      // emits the entered value to home component
      if (this.newsForEdit) {
        this.onClickSubmit.emit({ ...this.newsForm.value, id: this.newsForEdit.id });
      } else {
        this.onClickSubmit.emit(this.newsForm.value);
      }
    } else {
      alert('Please enter valid values');
    }
  }

  /**
   * onClickCloseButton called on click of close on top left of modal
   */
  onClickCloseButton() {
    this.onClickClose.emit('');
  }
}
