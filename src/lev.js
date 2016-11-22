module.exports = function lev() {
  function recLev(max, state, strM, str) {
    // if there are chars left in the string to match
    if (strM.length > 0) {
      const newState = [state[0] + 1]; // the first entry is the match from an empty string
      for (let i = 0; i < state.length - 1; i += 1) {
        const deletion = newState[i] + 1;
        const insertion = state[i + 1] + 1;
        const cost = strM.charAt() === str.charAt(i) ? 0 : 1;
        const substitution = state[i] + cost;
        const value = Math.min(deletion, insertion, substitution);

        newState.push(value);
      }

      // if you can still match, check the next char
      if (Math.min(...newState) <= max) {
        return recLev(max, newState, strM.slice(1), str);
      }

      // if you can't match, return false
      return false;
    }
    // no more chars, is the last entry with the distance?
    return state.pop() <= max;
  }

  function match(max, strToMatch, str) {
    const firstRow = [...new Array(str.length + 1).keys()];
    return recLev(max, firstRow, strToMatch, str);
  }

  return Object.freeze({
    match,
  });
};
