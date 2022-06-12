import { TestBed } from '@angular/core/testing';

import { AplicanteService } from './aplicante.service';

describe('AplicanteService', () => {
  let service: AplicanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
