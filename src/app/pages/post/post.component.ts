import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  postsSubscription!: Subscription;
  constructor(private postService: PostService, private ref:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsSubscription = this.postService
      .getPostsWithCategory()
      .subscribe((data) => {
        this.posts = data;
        this.ref.detectChanges()
      });
  }

  ngOnDestroy() {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }

}
