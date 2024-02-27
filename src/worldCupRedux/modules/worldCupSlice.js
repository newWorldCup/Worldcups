import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const worldCupSListlice = createSlice({
  name: 'worldCupListSlice',
  initialState,
  reducers: {
    getWorldCup: (state, action) => {
      return [action.payload];
    }
  }
});

export const { getWorldCup } = worldCupSListlice.actions;

export default worldCupSListlice.reducer;
