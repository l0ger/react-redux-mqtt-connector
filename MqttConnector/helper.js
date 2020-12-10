const generateTopicsFromMeta = (topicObj, state) => {
  const { title, selectorKey } = topicObj;
  if (!topicObj.selector) {
    return [title];
  }
  const topicsMeta = topicObj.selector(state);
  if (!topicsMeta) return null;

  if (!Array.isArray(topicsMeta))
    return [`${title}/${topicsMeta[selectorKey]}`];

  return topicsMeta.map(item => `${title}/${item[selectorKey]}`);
};

const computeTopics = (state, topics) => {
  let finalTopics = [];
  topics.forEach(topicObj => {
    const computedTopics = generateTopicsFromMeta(topicObj, state);
    if (computedTopics) {
      finalTopics = finalTopics.concat(computedTopics);
    }
  });
  return finalTopics;
};
export const topicsEquality = (prevState, nextState) => {
  return prevState.join('') === nextState.join('');
};

export const topicsSelector = (state, topics) => {
  return computeTopics(state, topics);
};
