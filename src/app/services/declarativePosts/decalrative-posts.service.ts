import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDAction, IPost } from 'src/app/models/IPost';
import { map, combineLatest, Subject, catchError, throwError, shareReplay, share, delay, BehaviorSubject, merge, scan, toArray } from 'rxjs'
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
      }),
      catchError(this.handleError),
      shareReplay(),
      ///share(),

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
    },  shareReplay()),
    catchError(this.handleError)
  );


private postCRUDSubject = new Subject<CRUDAction<IPost>>()
postCRUDAction$ = this.postCRUDSubject.asObservable()


allPosts$ = merge(
  this.postsWithCategory$,
  this.postCRUDAction$.pipe(map((data) => [data.data]))
).pipe(
  scan((posts, value) => {
    return [...posts, ...value];
  }, [] as IPost[])
);



addPost(post:IPost){
  this.postCRUDSubject.next({action:'add',data:post});

}



  selectedPostSubject = new BehaviorSubject<string>('');
  selectedPostAction$ = this.selectedPostSubject.asObservable();
  post$ = combineLatest([this.postsWithCategory$, this.selectedPostAction$]).pipe(map(([posts, selectedPostId]) => {
    return posts.filter((post) => post.id === selectedPostId)[0]
  }),catchError(this.handleError), shareReplay());

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
