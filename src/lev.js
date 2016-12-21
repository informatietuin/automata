module.exports = function lev() {
  function recLev(max, state, strM, str, mode = 'object', caseSensitive = true) {
    // the first entry is the match from an empty string
    const newState = [state[0] + 1];

    // if there are no chars left in the string to match
    if (strM.length === 0) {
      const distance = state.pop();
      const pass = distance <= max;
      if (mode === 'bool') {
        return pass;
      }
      return { distance, pass };
    }

    for (let i = 0; i < state.length - 1; i += 1) {
      const deletion = newState[i] + 1;
      const insertion = state[i + 1] + 1;
      const cost = (caseSensitive
        ? strM.charAt(0) === str.charAt(i)
        : strM.charAt(0).toLowerCase() === str.charAt(i).toLowerCase())
          ? 0 : 1;
      const substitution = state[i] + cost;
      const value = Math.min(deletion, insertion, substitution);

      newState.push(value);
    }

    if (Math.min(...newState) > max) {
      return false;
    }

    return recLev(max, newState, strM.slice(1), str, mode, caseSensitive);
  }

  function match({ max, strToMatch, str, mode, caseSensitive }) {
    const firstRow = [...new Array(str.length + 1).keys()];
    return recLev(max, firstRow, strToMatch, str, mode, caseSensitive);
  }

  function test({ max, strToMatch, str, caseSensitive }) {
    return match({ max, strToMatch, str, mode: 'bool', caseSensitive });
  }

  return Object.freeze({
    test,
    match,
  });
};
