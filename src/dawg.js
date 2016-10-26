// const sortedWordList = [];
// const sortedWordListLength = sortedWordList.length

// const dawg = [];

// node: final, edges
// edge: char, index_other

// [ finite set of states , alphabet, transitions, start, set of final states]

// p, q state equivalent iff
// both final or both non-final
// same number of outgoing transitions
// outgoing transitions have the same labels
// outgoing transitions lead to states that have the same right languages - minimal equivalent
// classes -> corresponing transitions lead to the same states
// => replacing p by q means deleting p and redirecting all it's ingoming edges to q

// if not equivalent => new class and needs to be but in register


// use adjacency matrix with the labels as values. will it be sparse? can there be more than one?

// adjacency lists
/*
[
  [
    [a, 3],
    [b, 4],
  ],
  [
    [a, 5],
    [c, 7],
  ]
]
*/
/*
  Register := ~;
  do there is another word --*
    Word := next word in lexicographic order;
    CommonPrefix := common_prefix(Word);
    LastState := 6*(q0,CommonPrefix);
    CurrentSuffix := Word[length(CommonPrefix)+ l. . . length(Word)l; if has_children(LastState) --,
    replace~r_register(Last State) fi;
    add_suffix(LastState, CurrentSuffix)
  od;
  replace_or_register(qo)

  func common_prefix(Word)
    return the longest prefix w of Word such that ~*(q0,w) ~ 3_
  cnuf

  func replace_or_register(State) --~
    Child := last_child(State);
    if has_children(Child)
      replace_or_register(Child)
    fi;

    if 3qEQ(q E Register A q = Child) --,
      last_child(State) :-- q: (q E Register A q = Child);
      delete(Child)
    else
      Register := Register U {Child}
    fi
  cnuf
*/

exports.dawg = function dawg() {
  const register = new Map();
  let previousWord = '';

  function prefixSuffixSplit(prev, curr) {
    let i = 0;
    for (i; prev[i] === curr[i]; i += 1) {}
    return [curr.slice(0, i), curr.slice(i)];
  }

  function isSameState(s1, s2) {
    return s1[0] === s2[0] &&
      s1[1].length === s2[1].length &&
      s1[1].every(([label, stateIdx], idx) =>
        s2[1][idx][0] === label &&
        s2[1][idx][1] === stateIdx);
  }

  function findSameNode(graph, node) {
    graph.find(el => isSameState(node, el));
  }

  function addNodeToRegister(rgraph, node) {
    graph.push(node);
  }

  function replaceLastChild(graph, nodeId, existingSameNodeId) {
    const parent = graph[nodeId];
    const edges = parent[1];
    const cardEdges = edges.length;
    const lastEdge = edges[cardEdges - 1];
    const [, lastChildId] = lastEdge;
    // make last child point to the existing same nodeId
    lastEdge[1] = existingSameNodeId;
    // remove replace node
    graph[lastChildId] = null;
  }

  function replaceOrRegister(state) {
    const child = lastChild(state);
    if(hasChildren(child)) {
      replaceOrRegister(child)
    } else {
      const sameNode = findSameNode(register, child);
      if (sameNode === undefined) {
        addNodeToRegister(register, child);
      } else {
        replaceLastChild(register, state, sameNode);
      }
    }
  }

  function lastChild() {

  }

  function hasChildren(state) {
    const [, transitions] = state;
    return transitions.length > 0;
  }

  function addSuffix(suffix, lastStateIndex) {
    const letters = suffix.split('');
    // add transition from lastStateIndex to new state with the first letter of the suffix as label
    register[lastStateIndex][1].push([letters.pop(), register.length]);
    // add new states for the remaining letters
    letters.forEach(letter => register.push(false, [letter, register.length]));
    // mark last state as final
    register[register.length - 1][0] = true;
  }

  function insert(word) {
    if (word.localeCompare(previousWord) < 0) {
      throw new Error('Words need to be inserted in lexically sorted order!');
    }
    // the common prefix is the prefix that the previous and the current word have in common
    // lastState is the state reached by transitioning from the root to the common prefix
    // if the lastState has children, then check if the state of the child is in the register of
    // states
    // if so, replace the child with that node. If not add it to the register.

    // lengte commonPrefix
    // lengte suffix
    // go back suffix length of steps in the state array; foreach state check if it exists, link
    // and delete
    const [commonPrefix, suffix] = prefixSuffixSplit(previousWord, word);
    const lastStateIndex = commonPrefix.length > 0 ? register.length - suffix.length : 0;
    replaceOrRegister(lastStateIndex);
    addSuffix(suffix, lastStateIndex);
    previousWord = word;
  }

  function finalize() {
    replaceOrRegister(0);
    return register;
  }

  function print() {

  }

  function highlandTransformer(stream) {
    return stream.consume((err, x, push, next) => {
      if (err) {
        // pass errors along the stream and consume next value
        push(err);
        next();
      } else if (x === null) {
        // pass nil (end event) along the stream
        push(null, finalize());
        push(null, x);
      } else {
        insert(x);
        next();
      }
    });
  }

  return Object.freeze({
    insert,
    print,
    highlandTransformer,
    replaceLastChild
  });
}
