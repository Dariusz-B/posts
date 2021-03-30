import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentPostState } from '../models/posts.model';

import { PostFacade } from './../store/facades/postFacade';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private postFacade: PostFacade, private formBuilder: FormBuilder) {}

  private id: string;
  post$: Observable<CurrentPostState>;
  newCommentForm: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postFacade.getCurrentPost(parseInt( this.id));

    this.newCommentForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      body: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.postFacade.resetCurrentPost();
  }

  formSubbmit() : void {
    this.submitted = true;

    if(this.newCommentForm.invalid){
      return;
    }

    let newComment = this.newCommentForm.value;
    newComment['postId'] = this.id;

    this.postFacade.sendComment(newComment);
    this.newCommentForm.setValue({ name: '', email: '', body: '' });
    this.submitted = false;
  }
}
