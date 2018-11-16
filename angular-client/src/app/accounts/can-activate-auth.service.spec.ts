import { TestBed } from '@angular/core/testing';

import { CanActivateAuthService } from './can-activate-auth.service';

describe('CanActivateAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanActivateAuthService = TestBed.get(CanActivateAuthService);
    expect(service).toBeTruthy();
  });
});
