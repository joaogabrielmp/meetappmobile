import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupCard from '~/components/MeetupCard';

import { fetchSubscriptionsRequest } from '~/store/modules/meetup/actions';

import { Container, MeetupText, List } from './styles';

export default function Subscription() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);

  useEffect(() => {
    async function loadMeetup() {
      try {
        console.tron.log('aqui');
        dispatch(fetchSubscriptionsRequest());
      } catch (error) {
        Alert.alert(
          'Falha ao carregar',
          'Houve um erro ao carregar os meetups'
        );
      }
    }

    loadMeetup();
  }, [dispatch]);

  async function handleSubscribe(id) {}

  return (
    <Background>
      <Header />
      <Container>
        {meetups > 0 ? (
          <MeetupText>Você não está inscrito em nenhum meetup</MeetupText>
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <MeetupCard
                data={item}
                textButton="Cancelar inscrição"
                onSubscribe={() => handleSubscribe(item.id)}
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
