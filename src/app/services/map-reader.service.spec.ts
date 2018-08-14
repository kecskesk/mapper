import { TestBed, inject } from '@angular/core/testing';

import { MapReaderService } from './map-reader.service';

describe('MapReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapReaderService]
    });
  });

  it('should be created', inject([MapReaderService], (service: MapReaderService) => {
    expect(service).toBeTruthy();
  }));
});
