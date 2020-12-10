// eslint-disable-next-line no-unused-vars
import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'mqtt';
import PropTypes from 'prop-types';

import request from '../../store/request';
import {
  socketStatusChangedAction,
  socketTopSubscriptionAction,
  socketTopUnsubscribeAll,
  socketTopUnsubscriptionAction,
} from '../../store/mqttConnector/mqttConnectorAction';
import mqttTopicResolvers from '../../store/mqttConnector/mqttConnectorResolver';
import { topicsSelector, topicsEquality } from './helper';

const MqttConnector = ({ topics }) => {
  const [mqtt, setMqtt] = useState(null);
  const dispatch = useDispatch();
  const computedTopics = useSelector(
    state => topicsSelector(state, topics),
    topicsEquality,
  );
  const subscribedTopics = useSelector(
    state => state.mqttConnector.subscribedTopics,
  );
  const listener = useCallback(
    // eslint-disable-next-line consistent-return
    (topic, message, options) => {
      if (options.retain) return 0;
      const topicName = topic.split('/')[0] || topic;
      if (mqttTopicResolvers[topicName]) {
        const messageObj = JSON.parse(message.toString());
        mqttTopicResolvers[topicName](dispatch, messageObj);
      }
    },
    [],
  );

  const onSocketStatusChange = status => {
    dispatch(socketStatusChangedAction(status));
  };

  useEffect(() => {
    const initializeSocket = () => {
      const mqttInstance = connect(request.mqttUrl, {
        username: request.mqttUsername,
        password: request.mqttPassword,
      });
      setMqtt(mqttInstance);
      mqttInstance.on('connect', () => onSocketStatusChange('connect'));
      mqttInstance.on('reconnect', () => onSocketStatusChange('reconnecting'));
      mqttInstance.on('close', () => onSocketStatusChange('closed'));
      mqttInstance.on('offline', () => onSocketStatusChange('offline'));
      mqttInstance.on('message', listener);
    };

    initializeSocket();
    // eslint-disable-next-line consistent-return
    return () => {
      if (!mqtt) return 0;
      mqtt.unsubscribe(topics);
      mqtt.end();
      dispatch(socketTopUnsubscribeAll(topics));
      setMqtt(null);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const manageTopicSubscription = () => {
      if (!computedTopics || !mqtt) return 0;
      subscribedTopics.forEach(sbTopic => {
        if (!computedTopics.includes(sbTopic)) {
          mqtt?.unsubscribe(sbTopic);
          dispatch(socketTopUnsubscriptionAction(sbTopic));
        }
      });
      computedTopics.forEach(cpTopic => {
        if (!subscribedTopics.includes(cpTopic)) {
          mqtt?.subscribe(cpTopic);
          dispatch(socketTopSubscriptionAction(cpTopic));
        }
      });
    };
    manageTopicSubscription();
  }, [computedTopics, mqtt]);
  return null;
};

MqttConnector.propTypes = {
  topics: PropTypes.array.isRequired,
};

export default MqttConnector;
