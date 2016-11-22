module.exports = function graph() {
  const finalNodes = [];
  const nodes = [];

  function insertArc(parent, label, child) {
    const arcs = nodes[parent];
    if (arcs.findIndex(label) === -1) {
      arcs.push([label, child]);
    }
  }

  function removeArc() {

  }

  function insertNode(final) {
    if (final) {
      finalNodes.push(true);
    } else {
      finalNodes.push(false);
    }
    // return node index is new length minus 1
    return nodes.push([]) - 1;
  }

  function getNode() {

  }

  function removeNode() {

  }

  function lastChild() {

  }

  function firstChild() {

  }

  function root() {
    return nodes[0];
  }

  function isFinal(id) {
    return finalNodes[id];
  }

  function accept() {

  }

  function acceptUnion() {

  }

  function acceptIntersection() {

  }

  function intersection() {

  }

  function union() {

  }

  // insert root node
  insertNode(false);

  return Object.freeze({
    insertArc,
    removeArc,
    insertNode,
    getNode,
    removeNode,
    lastChild,
    firstChild,
    root,
    isFinal,
    accept,
    acceptUnion,
    acceptIntersection,
    intersection,
    union,
  });
};
