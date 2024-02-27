import { configureStore } from '@reduxjs/toolkit';
import searchListSlice from 'worldCupRedux/modules/makeWorldCup/searchListSlice';
import worldCupListSlice from 'worldCupRedux/modules/makeWorldCup/worldCupSlice';
import videoListSlice from 'worldCupRedux/modules/makeWorldCup/videoListSlice';
import auth from 'worldCupRedux/modules/authSlice';
const store = configureStore({
  reducer: {
    searchListSlice,
    worldCupListSlice,
    videoListSlice,
    auth
  }
});

export default store;
