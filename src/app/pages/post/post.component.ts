import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post/post.service';
import {interval} from 'rxjs'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  postsSubscription!: Subscription;
  intervalSubscription!: Subscription;

  constructor(private postService: PostService, private ref:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {

    this.intervalSubscription=  interval(5000).subscribe({
      next:(data)=>{console.log(data);},
    error:(error)=>{console.log(error);},
    complete:()=>{console.log('completye Interval')},


  }
    )


    this.postsSubscription = this.postService
      .getPostsWithCategory()
      .subscribe(
      
      {
      next:(data)=>{console.log(data); this.posts = data;
        this.ref.detectChanges()},
    error:(error)=>{console.log(error);},
    complete:()=>{console.log('completye http call')},


  }
      
      );
  }

  ngOnDestroy() {
    this.postsSubscription && this.postsSubscription.unsubscribe();
    this.intervalSubscription && this.intervalSubscription.unsubscribe();

  }

}
