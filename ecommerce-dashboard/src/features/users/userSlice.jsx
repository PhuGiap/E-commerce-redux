// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../api/Services/userServices';

// Async Thunks
export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await userService.fetchUsers();
  return res.data;
});

export const addUser = createAsyncThunk('users/add', async (user) => {
  const res = await userService.addUser(user);
  return res.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await userService.deleteUser(id);
  return id;
});

export const updateUser = createAsyncThunk('users/update', async ({ id, data }) => {
  const res = await userService.updateUser(id, data);
  return res.data;
});

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
