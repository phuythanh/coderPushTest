import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchUsers, passhOrLikeUser } from '../apis/userClient';
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
  return response;
});

export const passOrLikeUsersAsync = createAsyncThunk(
  'user/passUsers',
  async ({ userId, isPassed }: { userId: number; isPassed: boolean }) => {
    await passhOrLikeUser(userId, isPassed);
    return userId;
  }
);

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
      })
      .addCase(passOrLikeUsersAsync.fulfilled, (state, action) => {});
  },
});

// export const {} = userSlice.actions;

export const totalRecordOfUser = (state: RootState) => state.user.totalRecord;
export const userList = (state: RootState) => state.user.userList;
export const isLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
