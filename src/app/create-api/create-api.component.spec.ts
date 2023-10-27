import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApiComponent } from './create-api.component';

describe('CreateApiComponent', () => {
  let component: CreateApiComponent;
  let fixture: ComponentFixture<CreateApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateApiComponent]
    });
    fixture = TestBed.createComponent(CreateApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
