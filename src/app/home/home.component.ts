import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board, News, Nullable } from '../models/news.model';
import { NewsService } from '../services/news.service';

/**
 * Home page where boardList , newsList is displayed
 * all operations like create News , Edit News , Delete News ,Publish or Achive News
 * is done in this page. 
 */
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
  selectedNewsType = 'draft';
  selectedBoard: Nullable<Board> = null;

  constructor(private newsService: NewsService, private router: Router) {
    this.boards = [];
    this.draftNews = [];
    this.publishedNews = [];
    this.archivedNews = [];
    this.modalValue = null;
    this.isError = false;
    this.isLoading = true;
    this.selectedNews = this.filteredNews(this.selectedNewsType);
  }

  
  ngOnInit(): void {
    //get the list of boards as soon as component is initialized
    this.newsService.retriveAllBoards().subscribe({
      next: (data) => {
      this.isLoading = false;
      this.boards = data;
      // the first board as default selected board
      this.selectedBoard = this.boards[0];
      // get the list of news for default board
      this.onBoardItemClick(this.selectedBoard);
      },
      //error handler
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
      },
      complete: () => this.isLoading = false
    });
  }


  /**
   * onBoardItemClick on click of Board item , gets all news related to the board
   * @param selectedBoardItem the selected Board
   * @returns list of news
   */
  onBoardItemClick(selectedBoardItem: Nullable<Board>) {
    this.isLoading = true;
    if (!selectedBoardItem) {
      return;
    }
    this.selectedBoard = selectedBoardItem;
    this.newsService.retrieveNewsByBoardId(selectedBoardItem.id).subscribe({
      next: (data) => {
        // retrieve all drafts , published and archived news separately from response
        const { drafts, published, archives } = data;
        this.draftNews = drafts;
        this.publishedNews = published;
        this.archivedNews = archives;
        this.isError = false;
        // set the default selected news type
        this.selectedNews = this.filteredNews(this.selectedNewsType);
      },
      //error handler
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
      },
      complete: () => this.isLoading = false
    });
  }
  
  /**
   * onSelectNewsType called on selection of news type from the drop down 
   * @param event selection event , contains the value selected
   */
  onSelectNewsType(event: any) {
    const { target: { value } } = event;
    this.selectedNewsType = value;
    this.selectedNews = this.filteredNews(value);
  }

  /**
   * filteredNews filters news by drafts, published or archived according to selected type
   * @param newsType selected newstype
   * @returns filtered list of news
   */
  filteredNews(newsType?: string) {
    switch (newsType) {
      case 'draft':
        return this.draftNews;
      case 'published':
        return this.publishedNews;
      case 'archived':
        return this.archivedNews;
      default:
        return this.draftNews;
    }
  }

  /**
   * responseHandler : common response handler for create , edit , delete news
   */
  responseHandler = {
    next: (x: any) => this.onBoardItemClick(this.selectedBoard),
    error: (error: any) => {
      this.isLoading = false;
      this.isError = true;
    },
    complete: () => this.isLoading = false,
  };

  /**
   * createNews creates a new news entry
   * @param formValue news form values filled by the user to create news
   */
  createNews(formValue: News) {
    this.isLoading = true;
    this.isShowCreateModal = false;
    // if modal is not prefilled , create news else edit news
    if (!this.modalValue) {
      this.newsService.createNews(formValue).subscribe(this.responseHandler);
    } else {
      this.newsService.editNews(formValue).subscribe(this.responseHandler);
    }
  }

  /**
   * onClickEditNews displays the modal to edit the news
   * @param itemValue the news value which needs editing
   */
  onClickEditNews(itemValue: News) {
    this.isShowCreateModal = true;
    this.modalValue = itemValue;
  }

  /**
   * closeModal closes the modal , and resets the modal value
   */
  closeModal() {
    this.isShowCreateModal = false;
    this.modalValue = null;
  }

  /**
   * onDeleteNews called on click of delete news in the news item
   * @param newsId id of news item selected to be deleted
   */
  onDeleteNews(newsId: string) {
    // confirms with user before delete
    if (confirm("Are you sure to delete? ")) {
      this.newsService.deleteNews(newsId).subscribe(this.responseHandler);
    }
  }

  /**
   * onMoveNewsToDifferentType called on click of archive/publish/draft news in the news item
   * @param newsId id of news item to be moved
   * @param type value contains either archived, publish or draft
   */
  onMoveNewsToDifferentType(newsId: string, type: string) {
    this.newsService.postNewsTo(newsId, type).subscribe(this.responseHandler);
  }

  navigateToCreateNews() {
    this.router.navigate(['/create-news']);
  }

}
