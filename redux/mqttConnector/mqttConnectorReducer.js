import {
  SOCKET_CONNECTION_STATUS_CHANGED,
  SOCKET_TOPIC_SUBSCRIBE,
  SOCKET_TOPIC_UNSUBSCRIBE,
  SOCKET_TOPIC_SUBSCRIBE_ALL,
  SOCKET_TOPIC_UNSUBSCRIBE_ALL,
} from './mqttConnectorConstant';

const initialState = {
  status: 'offline',
  subscribedTopics: [],
};

const mqttConnectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CONNECTION_STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      };
    case SOCKET_TOPIC_SUBSCRIBE:
      return {
        ...state,
        subscribedTopics: [...state.subscribedTopics, action.payload.topic],
      };
    case SOCKET_TOPIC_UNSUBSCRIBE:
      return {
        ...state,
        subscribedTopics: state.subscribedTopics.filter(
          topic => topic !== action.payload.topic,
        ),
      };

    case SOCKET_TOPIC_SUBSCRIBE_ALL:
      return {
        ...state,
        subscribedTopics: action.payload.topics,
      };
    case SOCKET_TOPIC_UNSUBSCRIBE_ALL:
      return {
        ...state,
        subscribedTopics: [],
      };
    default:
      return state;
  }
};

export default mqttConnectorReducer;
