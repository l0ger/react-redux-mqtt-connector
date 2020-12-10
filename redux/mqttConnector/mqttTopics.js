const portfolioSelector = state => {
  return state.portfolioWatchSelected?.data.type === 'portfolio'
    ? state.portfolio?.data
    : [];
};

const watchListSelector = state => {
  return state.portfolioWatchSelected?.data.type !== 'portfolio'
    ? state.watchList?.getInstrumentData
    : [];
};

export const mqttTopics = {
  common: [
    {
      title: 'market-status',
    },
    {
      title: 'dorsa-supervisor/',
    },
    {
      title: 'keycloak-login',
      selector: state => state.accounts,
      selectorKey: 'userMobileNumber',
    },
  ],
  index: [
    {
      title: 'price-changed',
      selector: watchListSelector,
      selectorKey: 'nsccode',
    },
    {
      title: 'bid-ask-changed',
      selector: watchListSelector,
      selectorKey: 'nsccode',
    },
    {
      title: 'last-status',
      selector: watchListSelector,
      selectorKey: 'nsccode',
    },
    {
      title: 'price-changed',
      selector: portfolioSelector,
      selectorKey: 'nsccode',
    },
    {
      title: 'bid-ask-changed',
      selector: portfolioSelector,
      selectorKey: 'nsccode',
    },
    {
      title: 'last-status',
      selector: portfolioSelector,
      selectorKey: 'nsccode',
    },
    {
      title: 'dorsa-portfolio',
      selector: state => {
        return state.portfolioWatchSelected?.data.type === 'portfolio'
          ? state.accounts?.selectedAccount
          : null;
      },
      selectorKey: 'accountNumber',
    },
    {
      title: 'price-changed',
      selector: state => state.selectedInstrument,
      selectorKey: 'isin',
    },
    {
      title: 'last-state',
      selector: state => state.selectedInstrument,
      selectorKey: 'isin',
    },
    {
      title: 'dorsa-remaining',
      selector: state => state.accounts?.selectedAccount,
      selectorKey: 'accountNumber',
    },
    {
      title: 'queue-changed',
      selector: state => state.selectedInstrument,
      selectorKey: 'isin',
    },
    {
      title: 'dorsa-order',
      selector: state => state.accounts?.selectedAccount,
      selectorKey: 'accountNumber',
    },
  ],
};

export const getMqttTopicsByPathName = pathName => {
  const { common } = mqttTopics;
  if (pathName === '/') {
    return [...common, ...mqttTopics.index];
  }
  const pageTopicTitle = Object.keys(mqttTopics).find(key =>
    pathName.includes(key),
  );
  return pageTopicTitle ? [...mqttTopics[pageTopicTitle], ...common] : common;
};
