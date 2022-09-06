import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, map, startWith, tap } from 'rxjs';
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';
import { NotificationService } from 'src/app/services/Notification/notification.service';

@Component({
  selector: 'app-declaratice-add-post',
  templateUrl: './declaratice-add-post.component.html',
  styleUrls: ['./declaratice-add-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DeclaraticeAddPostComponent implements OnInit {

  categories$ = this.categoryService.category$;
  postId = '';
 
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
  });

  selectedPostId = this.route.paramMap.pipe(
    map((paramMap) => {
      let id = paramMap.get('id');
      if (id) {
        this.postId = id;
      }
      this.postService.selectPost(id + '');
      return id;
    })
  );

  post$ = this.postService.post$.pipe(
    tap((post) => {
      post &&
        this.postForm.setValue({
          title: post?.title,
          description: post?.description,
          categoryId: post?.categoryId,
        });
    }), catchError((error)=>{
       this.notificationService.setErrorMessage(error);
       return EMPTY;
    })
  );


  notification$ = this.postService.postCRUDCompleteAction$.pipe(
    startWith(false),
    tap((message) => {
      if (message) {
        this.router.navigateByUrl('/declarativePosts');
      }
    })
  );

  vm$ = combineLatest([this.selectedPostId, this.post$,  this.notification$]);

  constructor(
    private categoryService: DecalrativeCategoryService,
    private route: ActivatedRoute,
    private postService: DecalrativePostsService,
    private router:Router,
    private notificationService:NotificationService,
  ) {this.postForm.reset()}

  ngOnInit(): void {}

  onPostSubmit() {
    let postDetails:any = this.postForm.value;
    if (this.postId) {
      postDetails = { ...postDetails, id: this.postId };
      this.postService.updatePost(postDetails);
    } else {
      this.postService.addPost(postDetails);
    }
  }

}
