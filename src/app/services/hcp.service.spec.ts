import { TestBed, inject } from '@angular/core/testing';

import { HcpService } from './hcp.service';

describe('HcpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HcpService]
    });
  });

  it('should be created', inject([HcpService], (service: HcpService) => {
    expect(service).toBeTruthy();
  }));
});
