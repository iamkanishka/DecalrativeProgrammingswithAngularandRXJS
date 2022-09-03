import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  posts:IPost[]=[]
   postSubscription! :Subscription
  constructor(private postService:PostService ) { }

  ngOnInit(): void {
   this.postSubscription= this.postService.getPost().subscribe((data)=>{
      this.posts=data
      console.log(data);
      
    })
  }

  ngOnDestroy(): void {
      if(this.postSubscription){
        this.postSubscription.unsubscribe()
      }
  }

}
