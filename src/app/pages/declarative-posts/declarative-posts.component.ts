import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';
import {map} from 'rxjs'
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DeclarativePostsComponent implements OnInit {
  selectedCategoryId= ''
  posts$ = this.decalrativePostsService.postsWithCategory$
  categories$ = this.categoryService.category$
  filteredPosts$ = this.posts$.pipe(map((posts)=>{
    return  posts.filter(post=> this.selectedCategoryId? post.categoryId===this.selectedCategoryId:true)
  }))

  constructor(private decalrativePostsService:DecalrativePostsService, private categoryService: DecalrativeCategoryService) { }

  ngOnInit(): void {
  }

  onCategoryChange(event:Event){
    let selectedId = (event.target as HTMLSelectElement ).value
    console.log(selectedId);
    this.selectedCategoryId =selectedId
    
    
  }

}
