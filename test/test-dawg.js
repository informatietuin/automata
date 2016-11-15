const dawg = require('../src/dawg').dawg();
const expect = require('chai').expect;

describe('dawg', () => {
  function getBaseGraph() {
    return [
      [false, [
        ['a', 1],
        ['b', 2],
      ]],
      [false, [
        ['c', 3],
      ]],
      [false, [
        ['c', 3],
      ]],
      [true, []],
    ];
  }

  describe('replaceLastChild', () => {
    const graph = getBaseGraph();
    const nodeId = 0;
    const sameNodeId = 1;
    dawg.replaceLastChild(graph, nodeId, sameNodeId);
    it('should replace the last child of the node', () => {
      expect(graph[nodeId][1].pop()[1]).to.equal(1);
    });
    it('should remove the replace node from the graph', () => {
      expect(graph[2]).to.equal(null);
    });
  });
});
