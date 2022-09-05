import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DecalrativeCategoryService } from 'src/app/services/declarativeCategory/decalrative-category.service';


@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UpdatePostComponent implements OnInit {

  categories$ = this.categoryService.category$;

  constructor(private categoryService: DecalrativeCategoryService) {}

  ngOnInit(): void {}

}
