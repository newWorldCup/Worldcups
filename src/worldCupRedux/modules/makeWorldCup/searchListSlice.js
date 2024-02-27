import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const searchListSlice = createSlice({
  name: 'searchListSlice',
  initialState,
  reducers: {
    addSearchList: (state, action) => {
      return action.payload;
    },
    resetSearchList: (state, action) => {
      return [];
    }
  }
});

export const { addSearchList, resetSearchList } = searchListSlice.actions;

export default searchListSlice.reducer;
