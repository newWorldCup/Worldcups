import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: true
};
//로그인상태 로딩상태관리
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.loading = action.payload.loading;
    }
  }
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
