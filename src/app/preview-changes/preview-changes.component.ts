import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-changes',
  templateUrl: './preview-changes.component.html',
  styleUrls: ['./preview-changes.component.css']
})
export class PreviewChangesComponent implements OnInit {
   
  @Input() enteredForm: any;
  hasClickedReadMore = false;
  constructor() { }
  dateTime = new Date().toString();

  ngOnInit(): void {
    console.log(this.enteredForm);
  }

  onClickOfReadMore() {
    this.hasClickedReadMore = true;
  }

}
