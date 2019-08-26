import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  meetups: [],
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/FETCH_MEETUPS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/FETCH_MEETUPS_SUCCESS': {
        draft.loading = false;
        draft.meetups = action.payload.meetups;
        break;
      }
      case '@meetup/SUBSCRIBE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/SUBSCRIBE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/FAILURE': {
        draft.loading = false;
        break;
      }
      case '@meetup/UNSUBSCRIBE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/FETCH_SUBSCRIPTIONS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/FETCH_SUBSCRIPTIONS_SUCCESS': {
        draft.loading = false;
        draft.meetups = action.payload.meetups;
        break;
      }
      default:
    }
  });
}
