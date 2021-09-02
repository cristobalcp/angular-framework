import { TestBed } from '@angular/core/testing';

import { LoadDashboardService } from './load-dashboard.service';

describe('LoadDashboardService', () => {
  let service: LoadDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
