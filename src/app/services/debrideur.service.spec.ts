import { TestBed } from '@angular/core/testing';

import { DebrideurService } from './debrideur.service';

describe('DebrideurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebrideurService = TestBed.get(DebrideurService);
    expect(service).toBeTruthy();
  });
});
