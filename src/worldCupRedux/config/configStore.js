import { configureStore } from '@reduxjs/toolkit';
import searchListSlice from 'worldCupRedux/modules/searchListSlice';
import worldCupListSlice from 'worldCupRedux/modules/worldCupSlice';
import auth from '../modules/authSlice';
const store = configureStore({
  reducer: {
    searchListSlice,
    worldCupListSlice,
    auth
  }
});

export default store;
