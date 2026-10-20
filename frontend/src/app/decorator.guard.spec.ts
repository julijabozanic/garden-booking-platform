import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { decoratorGuard } from './decorator.guard';

describe('decoratorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => decoratorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
