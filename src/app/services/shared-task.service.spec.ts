import { TestBed } from '@angular/core/testing';

import { SharedTaskService } from './shared-task.service';

describe('SharedTaskService', () => {
  let service: SharedTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
