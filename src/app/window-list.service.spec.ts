import { TestBed } from '@angular/core/testing';

import { WindowListService } from './window-list.service';

describe('WindowListService', () => {
  let service: WindowListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
