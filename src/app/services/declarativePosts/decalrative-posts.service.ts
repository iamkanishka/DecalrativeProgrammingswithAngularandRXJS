import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDAction, IPost } from 'src/app/models/IPost';
import { map, combineLatest, Subject, catchError, throwError, shareReplay, share, delay, BehaviorSubject, merge, scan, toArray, of, concatMap, Observable, tap } from 'rxjs'
import { DecalrativeCategoryService } from '../declarativeCategory/decalrative-category.service';
import { NotificationService } from '../Notification/notification.service';


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
  this.postCRUDAction$.pipe(
    concatMap((postAction) =>
      this.savePosts(postAction).pipe(
        map((post) => ({ ...postAction, data: post }))
      )
    )
  )
).pipe(
  scan((posts, value) => {
    return this.modifyPosts(posts, value);
  }, [] as IPost[]), shareReplay(1)
);

modifyPosts(posts: IPost[], value: IPost[] | CRUDAction<IPost>) {
  if (!(value instanceof Array)) {
    if (value.action === 'add') {
      return [...posts, value.data];
    }
    if (value.action === 'update') {
      return posts.map((post) =>
        post.id === value.data.id ? value.data : post
      );
    }
    if (value.action === 'delete') {
      return posts.filter((post) =>
        post.id !== value.data.id
      );
    }
  } else {
    return value;
  }

  return posts;
}

savePosts(postAction: CRUDAction<IPost>) {
  let postDetails$!: Observable<IPost>;

  if (postAction.action === 'add') {
    postDetails$ = this.addPostToServer(postAction.data).pipe(tap(post=>{
      this.notificationService.setSuccessMessage('Post Added Sucessfully')
    }));
  }

  if (postAction.action === 'update') {
    postDetails$ = this.updatePostToServer(postAction.data).pipe(tap(post=>{
      this.notificationService.setSuccessMessage('Post Updated Sucessfully')
    }));
  }

  if (postAction.action === 'delete') {
  return this.deletePostToServer(postAction.data).pipe(map((post)=>postAction.data),tap(post=>{
    this.notificationService.setSuccessMessage('Post Updated Sucessfully')
  }));
  }

  return postDetails$.pipe(
    concatMap((post) =>
      this.decalrativeCategoryService.category$.pipe(
        map((categories) => {
          return {
            ...post,
            categoryName: categories.find(
              (category) => category.id === post.categoryId
            )?.title,
          };
        })
      )
    )
  );
}



deletePostToServer(post: IPost) {
 return this.http .delete<IPost>( `https://rxjs-posts-default-rtdb.firebaseio.com/posts/${post.id}.json`, );
 }

updatePostToServer(post: IPost) {
  return this.http
    .patch<IPost>(
      `https://rxjs-posts-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      post
    )
    // .pipe(
    //   map((id) => {
    //     return {
    //       ...post,
          
    //     };
    //   })
    // );
}

addPostToServer(post: IPost) {
  return this.http
    .post<{ name: string }>(
      `https://rxjs-posts-default-rtdb.firebaseio.com/posts.json`,
      post
    )
    .pipe(
      map((id) => {
        return {
          ...post,
          id: id.name,
        };
      })
    );
}


addPost(post:IPost){
  this.postCRUDSubject.next({action:'add',data:post});

}
updatePost(post:IPost){
  this.postCRUDSubject.next({action:'update',data:post});

}

deletPost(post:IPost){
  this.postCRUDSubject.next({action:'delete',data:post});

}



  selectedPostSubject = new BehaviorSubject<string>('');
  selectedPostAction$ = this.selectedPostSubject.asObservable();
  post$ = combineLatest([this.allPosts$, this.selectedPostAction$]).pipe(map(([posts, selectedPostId]) => {
    return posts.filter((post) => post.id === selectedPostId)[0]
  }),catchError(this.handleError), shareReplay());

  selectPost(postId: string) {
    this.selectedPostSubject.next(postId)
  }

  constructor(private http: HttpClient, 
    private decalrativeCategoryService: DecalrativeCategoryService,
    private notificationService:NotificationService
    ) { }

 handleError(error:Error){
  return throwError(()=>{
    return "unknown Error Occureed, Please try Again"+error
  })
  }

}
