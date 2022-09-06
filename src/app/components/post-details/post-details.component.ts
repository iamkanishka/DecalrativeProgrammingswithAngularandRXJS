import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailsComponent  {
  errorMessageSubject =  new BehaviorSubject<string>('')
  errorMessageAction$ = this.errorMessageSubject.asObservable()
  showUpdatePost = false;
  post$ = this.decalrativePostsService.post$.pipe(tap((post) => {
    this.showUpdatePost = false;
  }),catchError((error:string)=>{
    this.errorMessageSubject.next(error)
    return EMPTY;
  }))
  constructor(private decalrativePostsService:DecalrativePostsService ) { 
  

  }
 
  onUpdatePost() {
    this.showUpdatePost = true;
  }

  onDeletePost(post:IPost){
    if(confirm('Sure you want to Delete')){
      this.decalrativePostsService.deletPost(post)
    }

  }

  
}
