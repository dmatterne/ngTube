import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Quality } from './quality.pipe';

describe('Quality Pipe', () => {
  beforeEachProviders(() => [Quality]);

  it('should transform the input', inject([Quality], (pipe: Quality) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
