import {
  changeByPortfolioAction,
  resolverBidAskAction,
  resolverPriceChangeAction,
  resolverStatusChangeAction,
} from '../portfolio/portfolioAction';
import {
  updateInstrumentQueueAction,
  updateInstrumentStateAction,
} from '../instrument/instrumentAction';
import {
  keyCloakLoginAction,
  updateAccountBalanceAction,
} from '../accounts/accountsAction';
import { updateOrderAction } from '../orders/ordersAction';
import {
  updateMarketStatusAction,
  updateSupervisorMessageAction,
} from '../market/marketAction';

const mqttTopicResolvers = {
  'price-changed': (dispatch, message) => {
    dispatch(resolverPriceChangeAction(message));
  },
  'bid-ask-changed': (dispatch, message) => {
    dispatch(resolverBidAskAction(message));
  },
  'last-status': (dispatch, message) => {
    dispatch(resolverStatusChangeAction(message));
  },
  'dorsa-portfolio': (dispatch, message) => {
    dispatch(changeByPortfolioAction(message));
  },
  'last-state': (dispatch, message) => {
    dispatch(updateInstrumentStateAction(message));
  },
  'dorsa-remaining': (dispatch, message) => {
    dispatch(updateAccountBalanceAction(message));
  },
  'queue-changed': (dispatch, message) => {
    dispatch(updateInstrumentQueueAction(message));
  },
  'dorsa-order': (dispatch, message) => {
    dispatch(updateOrderAction(message));
  },
  'market-status': (dispatch, message) => {
    dispatch(updateMarketStatusAction(message));
  },
  'keycloak-login': (dispatch, message) => {
    dispatch(keyCloakLoginAction(message));
  },
  'dorsa-supervisor': (dispatch, message) => {
    dispatch(updateSupervisorMessageAction(message));
  },
};
export default mqttTopicResolvers;
