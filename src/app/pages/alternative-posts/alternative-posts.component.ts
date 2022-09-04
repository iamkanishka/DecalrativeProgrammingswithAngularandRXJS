import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-alternative-posts',
  templateUrl: './alternative-posts.component.html',
  styleUrls: ['./alternative-posts.component.scss']
})
export class AlternativePostsComponent  {
  posts$ = this.decalrativePostsService.postsWithCategory$

  constructor(private decalrativePostsService :DecalrativePostsService) { }

  onSelectPost(post:IPost, event:Event){
    event.preventDefault()
     console.log(post);
     
  }
 
}
