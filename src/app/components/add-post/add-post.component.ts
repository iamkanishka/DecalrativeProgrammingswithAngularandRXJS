import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IPost } from 'src/app/models/IPost';
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';
import { DecalrativePostsService } from 'src/app/services/declarativePosts/decalrative-posts.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
  });

  categories$ = this.categoryService.category$;
  constructor(private categoryService: DecalrativeCategoryService, private  decalrativePostsService:DecalrativePostsService ) {}

  ngOnInit(): void {}

  onAddPost() {
    console.log(this.postForm.value);
    let postData:any = this.postForm.value
    this.decalrativePostsService.addPost(postData)
  }
}