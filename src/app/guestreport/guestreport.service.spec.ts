import { TestBed } from '@angular/core/testing';

import { guestreportService } from './guestreport.service';
import {HttpClientModule} from '@angular/common/http';

describe('guestreportService', () => {
  let service: guestreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [guestreportService]
    });
    service = TestBed.inject(guestreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
