import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { subDays, addDays } from 'date-fns';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DatePicker from '~/components/DatePicker';
import MeetupCard from '~/components/MeetupCard';

import { Container, DateHeader, Button, MeetupText, List } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: { date },
      });

      setMeetups(response.data);
    }

    loadMeetups();
  }, [date]);

  async function handleSubscribe(id) {
    try {
      await api.post(`/meetups/${id}/subscriptions`);

      Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
    } catch (err) {
      const errData = err.response.data;
      Alert.alert('Falha na inscrição', `${errData.error}`);
    }
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
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
