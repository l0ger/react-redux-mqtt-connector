import {
  SOCKET_CONNECTION_STATUS_CHANGED,
  SOCKET_TOPIC_SUBSCRIBE,
  SOCKET_TOPIC_UNSUBSCRIBE,
  SOCKET_TOPIC_SUBSCRIBE_ALL,
  SOCKET_TOPIC_UNSUBSCRIBE_ALL,
} from './mqttConnectorConstant';

export const socketStatusChangedAction = status => {
  return { type: SOCKET_CONNECTION_STATUS_CHANGED, payload: { status } };
};

export const socketTopSubscriptionAction = topic => {
  return { type: SOCKET_TOPIC_SUBSCRIBE, payload: { topic } };
};

export const socketTopUnsubscriptionAction = topic => {
  return { type: SOCKET_TOPIC_UNSUBSCRIBE, payload: { topic } };
};

export const socketTopSubscribeAll = topics => {
  return { type: SOCKET_TOPIC_SUBSCRIBE_ALL, payload: { topics } };
};

export const socketTopUnsubscribeAll = topics => {
  return { type: SOCKET_TOPIC_UNSUBSCRIBE_ALL, payload: { topics } };
};
