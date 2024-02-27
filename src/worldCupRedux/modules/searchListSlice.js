import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const searchListSlice = createSlice({
  name: 'searchListSlice',
  initialState,
  reducers: {
    addSearchList: (state, action) => {
      return action.payload;
    }
  }
});

export const { addSearchList } = searchListSlice.actions;

export default searchListSlice.reducer;
