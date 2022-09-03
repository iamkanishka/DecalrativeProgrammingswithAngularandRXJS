import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import {map, combineLatest} from 'rxjs'
import { DecalrativeCategoryService } from '../declarativeCategory/decalrative-category.service';


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

   postsWithCategory$ = combineLatest([
    this.posts$,
    this.decalrativeCategoryService.category$,
  ]).pipe(
    map(([posts, categories]) => {
      return posts.map((post) => {
        return {
          ...post,
          categoryName: categories.find(
            (category) => category.id === post.categoryId
          )?.title,
        } as IPost;
      });
    })
  );
 
   constructor(private http:HttpClient, private decalrativeCategoryService:DecalrativeCategoryService) { }

}
