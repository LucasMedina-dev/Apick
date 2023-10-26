import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApickComponent } from './apick.component';

describe('ApickComponent', () => {
  let component: ApickComponent;
  let fixture: ComponentFixture<ApickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApickComponent]
    });
    fixture = TestBed.createComponent(ApickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
