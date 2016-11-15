const { graph } = require('../src/graph');
const expect = require('chai').expect;

// insertArc,
// removeArc,
// insertNode,
// removeNode,
// lastChild,
// firstChild,
// root,
// isFinal,
// accept,
// acceptUnion,
// acceptIntersection,
// intersection,
// union,
describe('graph', () => {
  describe('factory function', () => {
    it('should return an object with the graph functions', () => {
      expect(graph().root).to.be.a('function');
    });
  });
  describe('insert node', () => {
    it('should return the index of the node', () => {
      expect(graph().insertNode()).to.equal(1);
    });
  });
  describe('insert arc', () => {
    it('should return the number of children of the parent / siblings of the child', () => {
      const g = graph();
      g.insertNode();
      expect(graph().insertArc(0, 'a', 1)).to.equal();
    })
  })
});
