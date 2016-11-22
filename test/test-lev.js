const lev = require('../src/lev');
const expect = require('chai').expect;

describe('lev', () => {
  describe('match', () => {
    it('should handle empty strings', () => {
      expect(lev().match(1, 'a', '')).to.be.true;
      expect(lev().match(1, '', 'a')).to.be.true;
    });
    it('should handle a distace of zero', () => {
      expect(lev().match(0, 'a', 'a')).to.be.true;
      expect(lev().match(0, '', 'a')).to.be.false;
    });
    it('should fail on edit distance too long', () => {
      expect(lev().match(1, 'a', 'aaa')).to.be.false;
    });
    it('should handle deletion', () => {
      expect(lev().match(1, 'abc', 'ac')).to.be.true;
      expect(lev().match(1, 'abc', 'ad')).to.be.false;
    });
    it('should handle substitution', () => {
      expect(lev().match(1, 'abc', 'aac')).to.be.true;
      expect(lev().match(1, 'abc', 'aad')).to.be.false;
    });
  });
});
