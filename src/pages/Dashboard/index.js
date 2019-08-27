import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { format, parseISO, isBefore, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DatePicker from '~/components/DatePicker';
import MeetupCard from '~/components/MeetupCard';

import { Container, DateHeader, Button, MeetupText, List } from './styles';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('meetups', {
          params: { date, page },
        });

        const data = response.data.map(meetup => ({
          ...meetup,
          past: isBefore(parseISO(meetup.date), new Date()),
          defaultDate: meetup.date,
          date: format(parseISO(meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
            locale: pt,
          }),
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
  }, [date, isFocused, page]);

  async function handleSubscribe(id) {
    try {
      await api.post(`/meetups/${id}/subscriptions`);

      Alert.alert('Sucesso!', 'Inscrição realizada');
    } catch (err) {
      Alert.alert(
        'Falha ao inscrever-se',
        'Houve um erro ao inscrever-se no meetup'
      );
    }
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function loadMoreMeetUps() {
    const response = await api.get('meetups', {
      params: { date, page },
    });

    const data = response.data.map(meetup => ({
      ...meetup,
      past: isBefore(parseISO(meetup.date), new Date()),
      defaultDate: meetup.date,
      date: format(parseISO(meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
        locale: pt,
      }),
    }));

    setMeetups(data);
    setPage(page + 1);
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateHeader>
          <Button onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#FFF" />
          </Button>
          <DatePicker date={date} onChange={setDate} />
          <Button onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#FFF" />
          </Button>
        </DateHeader>

        {meetups.length === 0 ? (
          <MeetupText>Nenhum meetup para este dia</MeetupText>
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.1}
            // onEndReached={loadMoreMeetUps}
            renderItem={({ item }) => (
              <MeetupCard
                data={item}
                textButton="Realizar inscrição"
                onHandle={() => handleSubscribe(item.id)}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
