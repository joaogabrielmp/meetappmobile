import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupCard from '~/components/MeetupCard';

import {
  fetchSubscriptionsRequest,
  unsubscribeMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, MeetupText, List } from './styles';

export default function Subscription() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);

  useEffect(() => {
    async function loadMeetup() {
      console.tron.log('passou loadMeetup');
      dispatch(fetchSubscriptionsRequest());
    }

    loadMeetup();
  }, [dispatch]);

  async function handleUnsubscribe(id) {
    await dispatch(unsubscribeMeetupRequest({ id }));
    await dispatch(fetchSubscriptionsRequest());
  }

  return (
    <Background>
      <Header />
      <Container>
        {meetups.length === 0 ? (
          <MeetupText>Você não está inscrito em nenhum meetup</MeetupText>
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <MeetupCard
                data={item}
                textButton="Cancelar inscrição"
                onHandle={() => handleUnsubscribe(item.subscriptionId)}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
