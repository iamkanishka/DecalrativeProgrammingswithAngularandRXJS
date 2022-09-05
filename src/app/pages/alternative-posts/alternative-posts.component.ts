import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';
import {tap, combineLatest, map, toArray} from 'rxjs'


@Component({
  selector: 'app-alternative-posts',
  templateUrl: './alternative-posts.component.html',
  styleUrls: ['./alternative-posts.component.scss']
})
export class AlternativePostsComponent  {
  showAddPost:Boolean=false;
  posts$ = this.decalrativePostsService.allPosts$
  .pipe(tap((posts:any)=>{
    posts[0].id && this.decalrativePostsService.selectPost(posts[0].id!)
  }))
  selectedPost$ = this.decalrativePostsService.post$
  
  vm$ = combineLatest([this.posts$, this.selectedPost$]).pipe(
    map(([posts, selectedPost]) => {
      return { posts, selectedPost };
    })
  );

  constructor(private decalrativePostsService :DecalrativePostsService) {
    this.posts$.subscribe((data)=>{
      console.log(data);
      
    })
   }

  onSelectPost(post:IPost, event:Event){
    event.preventDefault();
    this.showAddPost=false
    post.id && this.decalrativePostsService.selectPost(post.id!)

 }
 
 onAddPost(){
  this.showAddPost=true

 }
}
