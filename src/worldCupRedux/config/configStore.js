import { configureStore } from '@reduxjs/toolkit';
import searchListSlice from 'worldCupRedux/modules/searchListSlice';
import worldCupListSlice from 'worldCupRedux/modules/worldCupSlice';

const store = configureStore({
  reducer: {
    searchListSlice,
    worldCupListSlice
  }
});

export default store;
