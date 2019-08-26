import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupCard from '~/components/MeetupCard';

import { Container, MeetupText, List } from './styles';

export default function Subscription() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('subscriptions');

      const data = response.data.map(subscription => ({
        subscriptionId: subscription.id,
        ...subscription.Meetup,
        past: isBefore(parseISO(subscription.Meetup.date), new Date()),
        defaultDate: subscription.Meetup.date,
        date: format(
          parseISO(subscription.Meetup.date),
          "dd 'de' MMMM',' 'às' HH'h'",
          {
            locale: pt,
          }
        ),
      }));

      setMeetups(data);
    }

    loadMeetups();
  });

  async function handleUnsubscribe(id) {
    try {
      await api.delete(`/subscriptions/${id}`);

      setMeetups(meetups.filter(item => item.id !== id));

      Alert.alert('Sucesso', 'Você cancelou a inscrição no meetup');
    } catch (err) {
      const errData = err.response.data;
      Alert.alert('Falha no cancelamento', `${errData.error}`);
    }
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
