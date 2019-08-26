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
      try {
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
      } catch (error) {
        Alert.alert(
          'Falha na busca',
          'Houve um erro ao realizar a busca dos meetups'
        );
      }
    }

    loadMeetups();
  }, []);

  async function handleUnsubscribe(id) {
    try {
      await api.delete(`/subscriptions/${id}`);

      setMeetups(meetups.filter(item => item.id !== id));

      Alert.alert('Sucesso!', 'Cancelamento realizado');
    } catch (error) {
      Alert.alert(
        'Falha ao descadastrar',
        'Houve um erro ao descadastrar do meetup'
      );
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
