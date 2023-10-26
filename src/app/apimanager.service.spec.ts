import { TestBed } from '@angular/core/testing';

import { ApimanagerService } from './apimanager.service';

describe('ApimanagerService', () => {
  let service: ApimanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApimanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
