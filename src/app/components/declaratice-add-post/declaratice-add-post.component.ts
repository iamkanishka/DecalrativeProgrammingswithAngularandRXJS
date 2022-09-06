import { Component, OnInit } from '@angular/core';
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';

@Component({
  selector: 'app-declaratice-add-post',
  templateUrl: './declaratice-add-post.component.html',
  styleUrls: ['./declaratice-add-post.component.scss']
})
export class DeclaraticeAddPostComponent implements OnInit {

  categories$ = this.categoryService.category$;

  constructor(private categoryService: DecalrativeCategoryService) {}

  ngOnInit(): void {}

}
