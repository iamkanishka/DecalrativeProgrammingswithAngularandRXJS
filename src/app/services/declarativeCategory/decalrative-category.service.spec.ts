import { TestBed } from '@angular/core/testing';

import { DecalrativeCategoryService } from './decalrative-category.service';

describe('DecalrativeCategoryService', () => {
  let service: DecalrativeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecalrativeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
