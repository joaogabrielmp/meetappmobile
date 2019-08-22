import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import pt from 'date-fns/locale/pt';
import { format, parseISO, isBefore } from 'date-fns';
import api from '~/services/api';
import {
  fetchMeetupSuccess,
  failureMeetup,
  newMeetupSuccess,
  cancelMeetupSuccess,
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

export function* newMeetup({ payload }) {
  try {
    const { file_id, title, description, date, location } = payload;

    yield call(api.post, 'meetups', {
      file_id,
      title,
      description,
      date,
      location,
    });
    Alert.alert('Sucesso!', 'Meetup criado com sucesso');
    yield put(newMeetupSuccess());
    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro do meetup, verifique seus dados'
    );
  }
}

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetups/${id}`);
    Alert.alert('Sucesso!', 'Meetup cancelado com sucesso');
    yield put(cancelMeetupSuccess());
    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha no cancelamento',
      'Houve um erro no cancelamento do meetup, verifique seus dados'
    );
  }
}

export function* editMeetup({ payload }) {
  try {
    const { id, file_id, title, description, date, location } = payload;

    const meetup = {
      title,
      description,
      date,
      location,
      file_id,
    };

    yield call(api.put, `meetups/${id}`, meetup);
    Alert.alert('Sucesso!', 'Meetup editado com sucesso');
    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha ao atualizar',
      'Houve um erro ao atualizar o meetup, verifique seus dados'
    );
  }
}

export default all([
  takeLatest('@meetup/FETCH_MEETUPS_REQUEST', fetchMeetup),
  takeLatest('@meetup/NEW_MEETUP_REQUEST', newMeetup),
  takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetup),
  takeLatest('@meetup/EDIT_MEETUP_REQUEST', editMeetup),
]);
