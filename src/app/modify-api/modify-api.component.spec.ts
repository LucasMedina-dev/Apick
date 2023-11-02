import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyApiComponent } from './modify-api.component';

describe('ModifyApiComponent', () => {
  let component: ModifyApiComponent;
  let fixture: ComponentFixture<ModifyApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyApiComponent]
    });
    fixture = TestBed.createComponent(ModifyApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
