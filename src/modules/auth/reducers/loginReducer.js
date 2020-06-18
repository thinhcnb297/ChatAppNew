import * as ActionTypes from '../actions/type';

const defaultState = {
  user: null,
  loading: false,
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    // ================================================================================================================
    case ActionTypes.LOGIN: {
      return {
        ...state,
        loading: false,
        user: action.user,
        error: null,
      };
    }

    case ActionTypes.LOGIN_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }

    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    }

    case ActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        users: null,
        loading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export default loginReducer;
