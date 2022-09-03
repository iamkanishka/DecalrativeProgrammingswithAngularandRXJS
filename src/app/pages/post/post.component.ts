import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postService:PostService ) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe((data)=>{
      console.log(data);
      
    })
  }

}
