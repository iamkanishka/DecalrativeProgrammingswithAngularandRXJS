import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';


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
  constructor(private categoryService: DecalrativeCategoryService) {}

  ngOnInit(): void {}

  onAddPost() {
    console.log(this.postForm.value);
  }
}