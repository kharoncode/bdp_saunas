import { TestBed } from '@angular/core/testing';

import { SaunasService } from '../saunas.service';

describe('SaunasService', () => {
  let service: SaunasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaunasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
