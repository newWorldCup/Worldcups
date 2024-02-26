import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const worldCupSListlice = createSlice({
  name: 'worldCupListSlice',
  initialState,
  reducers: {
    getWorldCup: (state, action) => {
      return [action.payload];
    },
    plusworldCup: (state, action) => {
      return [...state, action.payload];
    }
  }
});

export const { getWorldCup, plusworldCup } = worldCupSListlice.actions;

export default worldCupSListlice.reducer;
