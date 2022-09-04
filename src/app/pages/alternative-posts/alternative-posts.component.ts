import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';


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
    this.decalrativePostsService.selectPost(post.id!)

 }
 
}
