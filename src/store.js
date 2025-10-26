// university-portal-frontend/src/store.js
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  notifications: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, notifications: [] };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;