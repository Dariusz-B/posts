import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PostFacade } from './../store/facades/postFacade';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private postFacade: PostFacade) {}

  private id: string;
  post$: Observable<any>;

  nameVal = null;
  emailVal = null;
  bodyVal = null;

  newCommentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    body: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postFacade.getCurrentPost(this.id);
  }

  ngOnDestroy(): void {
    this.postFacade.resetCurrentPost();
  }

  formSubbmit() {
    let newComment = this.newCommentForm.value;
    newComment['postId'] = this.id;
    newComment['id'] = null;

    this.nameVal = this.newCommentForm.controls.name.valid;
    this.emailVal = this.newCommentForm.controls.email.valid;
    this.bodyVal = this.newCommentForm.controls.body.valid;

    if (this.nameVal && this.emailVal && this.bodyVal) {
      this.postFacade.sendComment(newComment);
      this.newCommentForm.setValue({ name: '', email: '', body: '' });
      this.nameVal = null;
      this.emailVal = null;
      this.bodyVal = null;
    }
  }
}
