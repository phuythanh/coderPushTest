import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchUsers } from '../apis/userClient';
import { IPageWrapperRequest } from '../types/entities';
import { UserResponse } from '../types/userEntity';

export interface userState {
  userList: UserResponse[];
  totalRecord: number;
  isLoading: boolean;
}

const initialState: userState = {
  userList: [],
  totalRecord: 0,
  isLoading: false,
};

export const fetchUsersAsync = createAsyncThunk('user/fetchUsers', async (request: IPageWrapperRequest) => {
  const response = await fetchUsers(request);
  if (response) {
    response.totalRecord = 100;
  }
  return response;
});

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload.results;
        state.totalRecord = action.payload.totalRecord;
      });
  },
});

// export const {} = userSlice.actions;

export const totalRecordOfUser = (state: RootState) => state.user.totalRecord;
export const userList = (state: RootState) => state.user.userList;

export default userSlice.reducer;
