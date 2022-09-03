import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import {map} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DecalrativePostsService {
   posts$ = this.http
   .get<{ [id: string]: IPost }>(
     `https://rxjs-posts-default-rtdb.firebaseio.com/posts.json`
   )
   .pipe(
     map((posts) => {
       let postsData: IPost[] = [];
       for (let id in posts) {
         postsData.push({ ...posts[id], id });
       }
       return postsData;
     })
   );
  constructor(private http:HttpClient) { }

}
