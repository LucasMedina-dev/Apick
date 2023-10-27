import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiviewComponent } from './apiview.component';

describe('ApiviewComponent', () => {
  let component: ApiviewComponent;
  let fixture: ComponentFixture<ApiviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiviewComponent]
    });
    fixture = TestBed.createComponent(ApiviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
