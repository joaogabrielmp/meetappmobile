import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import pt from 'date-fns/locale/pt';
import { format, parseISO, isBefore } from 'date-fns';
import api from '~/services/api';
import {
  fetchMeetupSuccess,
  failureMeetup,
  subscribeMeetupSuccess,
  unsubscribeMeetupSuccess,
  fetchSubscriptionsSuccess,
} from './actions';

export function* fetchMeetup() {
  try {
    const response = yield call(api.get, 'organizer');

    const meetups = response.data.map(meetup => ({
      ...meetup,
      past: isBefore(parseISO(meetup.date), new Date()),
      defaultDate: meetup.date,
      date: format(parseISO(meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
        locale: pt,
      }),
    }));

    yield put(fetchMeetupSuccess(meetups));
  } catch (error) {
    Alert.alert('Falha na listagem', 'Houve um erro na listagem de meetups');
    yield put(failureMeetup());
  }
}

export function* subscribeMeetup({ payload }) {
  try {
    const { meetup_id } = payload;

    yield call(api.post, `meetups/${meetup_id}/subscriptions`);

    Alert.alert('Sucesso!', 'Inscrição realizada');
    yield put(subscribeMeetupSuccess());
  } catch (error) {
    Alert.alert(
      'Falha ao inscrever-se',
      'Houve um erro ao inscrever-se no meetup'
    );
    yield put(failureMeetup());
  }
}

export function* unsubscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `subscriptions/${id}`);

    Alert.alert('Sucesso!', 'Cancelamento realizado');
    yield put(unsubscribeMeetupSuccess());
  } catch (error) {
    Alert.alert(
      'Falha ao descadastrar',
      'Houve um erro ao descadastrar do meetup'
    );
    yield put(failureMeetup());
  }
}

export function* fetchSubscriptions() {
  try {
    const response = yield call(api.get, 'subscriptions');

    const meetups = response.data.map(subscription => ({
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

    yield put(fetchSubscriptionsSuccess(meetups));
  } catch (error) {
    Alert.alert('Falha na listagem', 'Houve um erro na listagem de meetups');
    yield put(failureMeetup());
  }
}

export default all([
  takeLatest('@meetup/FETCH_MEETUPS_REQUEST', fetchMeetup),
  takeLatest('@meetup/SUBSCRIBE_MEETUP_REQUEST', subscribeMeetup),
  takeLatest('@meetup/UNSUBSCRIBE_MEETUP_REQUEST', unsubscribeMeetup),
  takeLatest('@meetup/FETCH_SUBSCRIPTIONS_REQUEST', fetchSubscriptions),
]);
