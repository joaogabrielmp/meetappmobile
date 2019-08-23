import React, { useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { subDays, addDays } from 'date-fns';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DatePicker from '~/components/DatePicker';

import { Container, DateHeader, Button } from './styles';

function Dashboard() {
  const [date, setDate] = useState(new Date());

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
