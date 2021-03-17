import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Comment } from "src/app/models/posts.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { 
  }

  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getSinglePost(id:number): Observable<any>{
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  getComments(id:number): Observable<any>{
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  }

  addComment(comment: Comment): Observable<any>{
    return this.http.post(`https://jsonplaceholder.typicode.com/posts/`,comment)
  }

}


