import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {UserDto, UserInterface} from "@/interface/Interfaces";

const initialState: UserInterface = {
    id: 0,
    username: "",
    fullName: "",
    error: "",
    isLoggedIn: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action: PayloadAction<UserDto>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.id = action.payload.id
            state.fullName = action.payload.fullName
        }
    },
})

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions

export default userSlice.reducer