export function fetchMeetupRequest() {
  return {
    type: '@meetup/FETCH_MEETUPS_REQUEST',
  };
}

export function fetchMeetupSuccess(meetups) {
  return {
    type: '@meetup/FETCH_MEETUPS_SUCCESS',
    payload: { meetups },
  };
}

export function failureMeetup() {
  return {
    type: '@meetup/FAILURE',
  };
}

export function subscribeMeetupRequest({ meetup_id }) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_REQUEST',
    payload: { meetup_id },
  };
}

export function subscribeMeetupSuccess() {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_SUCCESS',
  };
}

export function unsubscribeMeetupRequest({ meetup_id }) {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_REQUEST',
    payload: { meetup_id },
  };
}

export function unsubscribeMeetupSuccess() {
  return {
    type: '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS',
  };
}

export function fetchSubscriptionsRequest() {
  return {
    type: '@meetup/FETCH_SUBSCRIPTIONS_REQUEST',
  };
}

export function fetchSubscriptionsSuccess(meetups) {
  return {
    type: '@meetup/FETCH_SUBSCRIPTIONS_SUCCESS',
    payload: { meetups },
  };
}
