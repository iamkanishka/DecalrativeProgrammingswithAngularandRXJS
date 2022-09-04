import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';
import {BehaviorSubject, combineLatest, map, tap} from 'rxjs'
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DeclarativePostsComponent implements OnInit {
  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction = this.selectedCategorySubject.asObservable()

  selectedCategoryId= ''
  posts$ = this.decalrativePostsService.postsWithCategory$
  categories$ = this.categoryService.category$
  filteredPosts$ = combineLatest([this.posts$, this.selectedCategoryAction]).pipe(tap((data)=>{
    this.loaderService.hideLoader()
  }),map(([posts,selectedCategoryId])=>{
    return  posts.filter(post=> selectedCategoryId? post.categoryId===selectedCategoryId:true)
  })) 
  
  // this.posts$.
  // pipe(map((posts)=>{
  //   return  posts.filter(post=> this.selectedCategoryId? post.categoryId===this.selectedCategoryId:true)
  // }))

  constructor(private decalrativePostsService:DecalrativePostsService,
     private categoryService: DecalrativeCategoryService,
     private loaderService:LoaderService
     ) { }

  ngOnInit(): void {
    this.loaderService.showLoader()
  }

  onCategoryChange(event:Event){
    this.selectedCategoryId = (event.target as HTMLSelectElement ).value
  this.selectedCategorySubject.next(this.selectedCategoryId)
    
    
  }

}
