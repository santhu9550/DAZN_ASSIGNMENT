import { expect } from 'chai';
import { describe, it } from 'mocha';
import { clearCache, getCache, setCache } from '../src/cache/cache';

describe(`CACHE TEST`, () => {
  it('Access in the accesing after setting', async () => {
    setCache('test', 'test-value');
    expect(getCache('test')).to.equal('test-value');
  });

  it('Access in the accesing after clearing the cache', async () => {
    clearCache();
    expect(getCache('test')).to.equal(null);
  });
});
