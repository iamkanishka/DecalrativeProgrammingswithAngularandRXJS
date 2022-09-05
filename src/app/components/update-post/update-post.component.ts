import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';


@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UpdatePostComponent  {
  
  postId:string =''
  categories$ = this.categoryService.category$;
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
  });
 



  post$ = this.postService.post$.pipe(
    tap((post) => {
      this.postId= post.id!
      this.postForm.setValue({
        title: post?.title,
        description: post?.description,
        categoryId: post?.categoryId,
      });
    })
  );


  onUpdatePost(){
    let postDetails:any =  {...this.postForm.value,id:this.postId};
  console.log(postDetails);
  this.postService.updatePost(postDetails)
  

  }

  constructor(private categoryService: DecalrativeCategoryService,
    private postService: DecalrativePostsService
    ) {}

}
