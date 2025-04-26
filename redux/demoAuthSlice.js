import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  error :null
};

const api = import.meta.env.VITE_URL;

export const LoginUser = createAsyncThunk(
    'loginUser',
    async ({ name }) => {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to submit review');
      const res = await response.json();
      console.log("login",res);
      return res;
    }
  );

const demoAuthSlice = createSlice({
  name: 'demoAuth',
  initialState,
  reducers: {
     logout : (state,action) => {
        state.user = null;
        state.isAuthenticated = false
     }
  },
  extraReducers: (builder) => {
    builder
    .addCase(LoginUser.pending, (state) => {
            state.isAuthenticated = false;
            state.error = null;
          })
          .addCase(LoginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
          })
          .addCase(LoginUser.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.error = action.error.message;
          })
  }
});

export const { logout } = demoAuthSlice.actions;

export default demoAuthSlice.reducer;
