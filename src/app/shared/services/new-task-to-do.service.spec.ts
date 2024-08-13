import { TestBed } from '@angular/core/testing';

import { NewTaskToDoService } from './new-task-to-do.service';

describe('NewTaskToDoService', () => {
  let service: NewTaskToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTaskToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
