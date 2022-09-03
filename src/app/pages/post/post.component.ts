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

  posts: IPost[] = [];
  postsSubscription!: Subscription;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsSubscription = this.postService
      .getPostsWithCategory()
      .subscribe((data) => {
        this.posts = data;
      });
  }

  ngOnDestroy() {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }

}
