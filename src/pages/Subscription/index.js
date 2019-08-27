import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupCard from '~/components/MeetupCard';

import { Container, MeetupText, List } from './styles';

function Subscription({ isFocused }) {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('subscriptions');

        const data = response.data.map(meetup => ({
          subscriptionId: meetup.id,
          ...meetup.Meetup,
          past: isBefore(parseISO(meetup.Meetup.date), new Date()),
          defaultDate: meetup.Meetup.date,
          date: format(
            parseISO(meetup.Meetup.date),
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

    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function handleUnsubscribe(meetup) {
    try {
      const { subscriptionId } = meetup;
      const { id } = meetup;

      await api.delete(`/subscriptions/${subscriptionId}`);

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
                onHandle={() => handleUnsubscribe(item)}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscription.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
