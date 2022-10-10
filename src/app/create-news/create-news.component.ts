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
    boardId: new FormControl('en', [Validators.required]),
    author: new FormControl('sneha@gmail.com', [Validators.required, Validators.email]),
    title: new FormControl(`UN alarm as Iran cracks down on anti-hijab protests sparked by woman's death`, [Validators.required]),
    description: new FormControl('Three people were reportedly killed on Monday at protests over the death in custody of Mahsa Amini.Three people were reportedly killed on Monday at protests over the death in custody of Mahsa Amini.', [Validators.required]),
    imageURL: new FormControl('https://ichef.bbci.co.uk/news/1024/branded_news/14ABC/production/_126786648_mediaitem126786229.jpg', [Validators.required])
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
