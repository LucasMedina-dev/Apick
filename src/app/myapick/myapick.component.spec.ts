import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapickComponent } from './myapick.component';

describe('MyapickComponent', () => {
  let component: MyapickComponent;
  let fixture: ComponentFixture<MyapickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyapickComponent]
    });
    fixture = TestBed.createComponent(MyapickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
