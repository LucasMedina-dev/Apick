import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourApisComponent } from './your-apis.component';

describe('YourApisComponent', () => {
  let component: YourApisComponent;
  let fixture: ComponentFixture<YourApisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourApisComponent]
    });
    fixture = TestBed.createComponent(YourApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
