import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DeclarativePostsComponent implements OnInit {

  posts$ = this.decalrativePostsService.postsWithCategory$

  constructor(private decalrativePostsService:DecalrativePostsService) { }

  ngOnInit(): void {
  }

}
