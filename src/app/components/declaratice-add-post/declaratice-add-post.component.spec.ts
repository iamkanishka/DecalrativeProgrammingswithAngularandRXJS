import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaraticeAddPostComponent } from './declaratice-add-post.component';

describe('DeclaraticeAddPostComponent', () => {
  let component: DeclaraticeAddPostComponent;
  let fixture: ComponentFixture<DeclaraticeAddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaraticeAddPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaraticeAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
