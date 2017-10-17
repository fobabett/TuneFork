import { TestBed, inject } from '@angular/core/testing';

import { SoundcloudService } from './soundcloud.service';

describe('SoundcloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundcloudService]
    });
  });

  it('should be created', inject([SoundcloudService], (service: SoundcloudService) => {
    expect(service).toBeTruthy();
  }));
});
