import { TestBed } from '@angular/core/testing';

import { DecalrativePostsService } from './decalrative-posts.service';

describe('DecalrativePostsService', () => {
  let service: DecalrativePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecalrativePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
