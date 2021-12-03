import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserDomainType } from "../../domain/user";

export type UserStatType = {
  user: UserDomainType | null;
};

const initialState = {
  user: null,
} as UserStatType;

export const userSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserDomainType>) {
      state.user = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;

export const selectUserData = (state: RootState) => state.user;
