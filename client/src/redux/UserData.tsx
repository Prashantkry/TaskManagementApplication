import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  SignedIn: boolean;
  email: string;
}

const initialState: UserState = {
  SignedIn: false,
  email: "",
};

const userData = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    setSignedIn(state, action: PayloadAction<boolean>) {
      state.SignedIn = action.payload;
    },
    setEmailData(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});

export const { setSignedIn, setEmailData } = userData.actions;
export default userData.reducer;
