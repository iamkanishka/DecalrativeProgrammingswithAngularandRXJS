import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
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

  post$ = this.decalrativePostsService.post$.pipe(catchError((error:string)=>{
    this.errorMessageSubject.next(error)
    return EMPTY;
  }))
  constructor(private decalrativePostsService:DecalrativePostsService ) { 
  

  }

  
}
