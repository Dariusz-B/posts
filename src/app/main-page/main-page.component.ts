import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostFacade } from './../store/facades/postFacade';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  posts$: Observable<any>;
  postsPerPage = 5;
  page = 0;

  constructor(private postFacade: PostFacade) {}

  ngOnInit(): void {
    this.posts$ = this.postFacade.getPosts();
  }

  moveToPage(page) {
    this.page = page;
    window.scrollTo(0, 0);
  }
}
