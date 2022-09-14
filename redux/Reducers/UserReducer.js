import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
    name: "user",
    initialState:{
        userContainer : [],
        userLogin : false,
        userError: false,
    },
    reducers: {
        UserChangePicture : (state, action)=>{
            state.userPhoto = action.payload;
        },
        LoginUserStart : (state)=>{
            state.userLogin = false;
            state.userError = false;
        },
        LoginUserSuccess : (state, action)=>{
             state.userLogin = true;
             state.userContainer = action.payload;
             state.userError = false;
        },
        LoginUserFailure : (state)=>{
             state.userLogin = false;
             state.userError = true;
        },
        UserLogout : (state)=>{
            state.userContainer = [];
            state.userLogin = false;
        }

    }
})

export const {
  UserChangePicture,
  LoginUserStart,
  LoginUserSuccess,
  LoginUserFailure,
  UserLogout,
} = UserReducer.actions
export default UserReducer.reducer;