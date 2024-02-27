import { createSlice } from '@reduxjs/toolkit';

const rawUid = localStorage.getItem('uid');
const uid = rawUid ? JSON.parse(rawUid) : '';
const rawVideoList = localStorage.getItem(`videoList${uid}`);
const parsedList = rawVideoList ? JSON.parse(rawVideoList) : [];

const initialState = parsedList;

const videoListSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    addVideoList: (state = initialState, action) => {
      return [...state, action.payload];
    },
    renewVideoList: (state, action) => {
      return action.payload;
    }
  }
});

export default videoListSlice.reducer;

export const { addVideoList, renewVideoList } = videoListSlice.actions;
