import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { IsoToHMS } from './iso-to-hms.pipe';

describe('IsoToHMS Pipe', () => {
  beforeEachProviders(() => [IsoToHMS]);
});
