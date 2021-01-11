import { TestBed } from '@angular/core/testing';

import { ImagesurlService } from './imagesurl.service';

describe('ImagesurlService', () => {
  let service: ImagesurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
