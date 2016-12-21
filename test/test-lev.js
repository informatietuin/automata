const lev = require('../src/lev');
const expect = require('chai').expect;

describe('lev', () => {
  describe('match', () => {
    it('should handle empty strings', () => {
      expect(lev().test({ max: 1, strToMatch: 'a', str: '' })).to.be.true;
      expect(lev().test({ max: 1, strToMatch: '', str: 'a' })).to.be.true;
    });
    it('should handle a distace of zero', () => {
      expect(lev().test({ max: 0, strToMatch: 'a', str: 'a' })).to.be.true;
      expect(lev().test({ max: 0, strToMatch: '', str: 'a' })).to.be.false;
    });
    it('should fail on edit distance too long', () => {
      expect(lev().test({ max: 1, strToMatch: 'a', str: 'aaa' })).to.be.false;
    });
    it('should handle deletion', () => {
      expect(lev().test({ max: 1, strToMatch: 'abc', str: 'ac' })).to.be.true;
      expect(lev().test({ max: 1, strToMatch: 'abc', str: 'ad' })).to.be.false;
    });
    it('should handle substitution', () => {
      expect(lev().test({ max: 1, strToMatch: 'abc', str: 'aac' })).to.be.true;
      expect(lev().test({ max: 1, strToMatch: 'abc', str: 'aad' })).to.be.false;
    });
    it('should respect the mode set to bool or not', function () {
      expect(lev().match({ max: 1, strToMatch: 'a', str: 'a' })).to.deep.equal({
        pass: true, distance: 0,
      });
      expect(lev().match({ max: 1, strToMatch: 'a', str: 'a', mode: 'bool' })).to.be.true;
    });
    it('should respect the caseSenstivity setting', function() {
      expect(lev().test({ max: 1, strToMatch: 'aBC', str: 'abc' })).to.be.false;
      expect(lev().test({ max: 1, strToMatch: 'aBC', str: 'abc', caseSensitive: false })).to.be.true;
    });
  });
});
