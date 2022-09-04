import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { map, combineLatest, Subject, catchError, throwError, shareReplay, share, delay, BehaviorSubject } from 'rxjs'
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
      delay(2000),
      map((posts) => {
        let postsData: IPost[] = [];
        for (let id in posts) {
          postsData.push({ ...posts[id], id });
        }
        return postsData;
      }),
      catchError(this.handleError),
      //shareReplay(1),
      share(),

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
    }),
    catchError(this.handleError)
  );



  selectedPostSubject = new BehaviorSubject<string>('');
  selectedPostAction$ = this.selectedPostSubject.asObservable();
  post$ = combineLatest([this.postsWithCategory$, this.selectedPostAction$]).pipe(map(([posts, selectedPostId]) => {
    return posts.filter((post) => post.id === selectedPostId)[0]
  }),catchError(this.handleError));

  selectPost(postId: string) {
    this.selectedPostSubject.next(postId)
  }

  constructor(private http: HttpClient, private decalrativeCategoryService: DecalrativeCategoryService) { }

 handleError(error:Error){
  return throwError(()=>{
    return "unknown Error Occureed, Please try Again"+error
  })
  }

}
