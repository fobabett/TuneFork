/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SoundcloudServiceService } from './soundcloud-service.service';

describe('SoundcloudService Service', () => {
  beforeEachProviders(() => [SoundcloudServiceService]);

  it('should ...',
      inject([SoundcloudServiceService], (service: SoundcloudServiceService) => {
    expect(service).toBeTruthy();
  }));
});
