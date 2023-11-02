import { TestBed } from '@angular/core/testing';

import { NavbarSearcherService } from './navbar-searcher.service';

describe('NavbarSearcherService', () => {
  let service: NavbarSearcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarSearcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
