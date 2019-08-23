import React, { useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { subDays, addDays } from 'date-fns';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DatePicker from '~/components/DatePicker';
import MeetupCard from '~/components/MeetupCard';

import { Container, DateHeader, Button, MeetupText, List } from './styles';

const meetups = [
  {
    past: false,
    id: 44,
    title: 'Encontro sobre C#',
    description: 'Um encontro legal sobre C#',
    location: 'Lagoa da Prata',
    date: '2019-08-31T18:00:00.000Z',
    createdAt: '2019-08-20T17:49:17.307Z',
    updatedAt: '2019-08-20T17:49:17.307Z',
    file_id: 69,
    user_id: 2,
    User: {
      id: 2,
      name: 'Joao2',
      email: 'joao2@me.com',
      password_hash:
        '$2a$08$ZY4vtImoFa/wfHt61zMY5ulyz/Y9lax6WTbdOuKp9xX2NCUwu8Dwq',
      createdAt: '2019-08-12T16:35:01.328Z',
      updatedAt: '2019-08-12T16:35:01.328Z',
    },
    file: {
      url: 'http://localhost:3333/files/c9a2453dae882ad07c828f50e79b862f.jpeg',
      id: 69,
      path: 'c9a2453dae882ad07c828f50e79b862f.jpeg',
    },
  },
  {
    past: false,
    id: 45,
    title: 'Encontro sobre Python e SQL',
    description: 'Um encontro legal sobre Python e SQL',
    location: 'Lagoa da Prata',
    date: '2019-08-31T19:00:00.000Z',
    createdAt: '2019-08-20T20:13:21.001Z',
    updatedAt: '2019-08-20T20:13:21.001Z',
    file_id: 69,
    user_id: 1,
    User: {
      id: 1,
      name: 'João Gabriel (Organizador)',
      email: 'joao@me.com',
      password_hash:
        '$2a$08$6F6QwXVOgqPfoqtBjmFDLe0aVlEpNg8TnO6tv8rkl0AY9BxTK3QwW',
      createdAt: '2019-08-12T16:34:47.200Z',
      updatedAt: '2019-08-20T17:07:46.125Z',
    },
    file: {
      url: 'http://localhost:3333/files/c9a2453dae882ad07c828f50e79b862f.jpeg',
      id: 69,
      path: 'c9a2453dae882ad07c828f50e79b862f.jpeg',
    },
  },
  {
    past: false,
    id: 43,
    title: 'Encontro sobre NodeJS, ReactJS e React Native',
    description: 'Um encontro legal!\nBora falar sobre essa incrível stack?',
    location: 'Lagoa da Prata',
    date: '2019-08-31T16:00:00.000Z',
    createdAt: '2019-08-20T17:06:09.145Z',
    updatedAt: '2019-08-20T17:06:09.145Z',
    file_id: 69,
    user_id: 1,
    User: {
      id: 1,
      name: 'João Gabriel (Organizador)',
      email: 'joao@me.com',
      password_hash:
        '$2a$08$6F6QwXVOgqPfoqtBjmFDLe0aVlEpNg8TnO6tv8rkl0AY9BxTK3QwW',
      createdAt: '2019-08-12T16:34:47.200Z',
      updatedAt: '2019-08-20T17:07:46.125Z',
    },
    file: {
      url: 'http://localhost:3333/files/c9a2453dae882ad07c828f50e79b862f.jpeg',
      id: 69,
      path: 'c9a2453dae882ad07c828f50e79b862f.jpeg',
    },
  },
];

function Dashboard() {
  const [date, setDate] = useState(new Date());

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubscribe(id) {}

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
                onSubscribe={() => handleSubscribe(item.id)}
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
