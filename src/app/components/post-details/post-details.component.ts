import { Component, OnInit } from '@angular/core';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent  {

  post$ = this.decalrativePostsService.post$;
  constructor(private decalrativePostsService:DecalrativePostsService ) { 
    this.post$.subscribe((data)=>{
      console.log(data);
      
    })

  }

  
}
