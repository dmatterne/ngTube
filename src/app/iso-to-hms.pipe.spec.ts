import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { IsoToHMSPipe } from './iso-to-hms.pipe';

describe('IsoToHMS Pipe', () => {
  beforeEachProviders(() => [IsoToHMSPipe]);
});
