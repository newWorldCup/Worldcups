import { configureStore } from '@reduxjs/toolkit';
import searchListSlice from 'worldCupRedux/modules/makeWorldCup/searchListSlice';
import worldCupListSlice from 'worldCupRedux/modules/makeWorldCup/worldCupSlice';
import auth from 'worldCupRedux/modules/authSlice';
const store = configureStore({
  reducer: {
    searchListSlice,
    worldCupListSlice,
    auth
  }
});

export default store;
