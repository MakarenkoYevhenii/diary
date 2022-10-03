import { createSlice } from '@reduxjs/toolkit';
import {signup,login,logout,current} from './auth-operation';


const initialState = {
    user: {
        name: "",
        email: ""
    },
    token: "",
    isLogin: false,
    error: null,
    loading: false
};
const authSlice=createSlice({
    name:"auth",
    initialState,
    extraReducers:{
        [signup.pending]:(state)=>{
            state.loading=true
            state.error=null
        },
        [signup.fulfilled]:(state,{payload})=>{
            state.user={...payload.user}
            state.token=payload.token
            state.isLogin=true
            state.loading=false
            state.error=null
         
        },
        [signup.rejected]:(state,{payload})=>{

            state.error=payload
            state.loading=false
        },
        [login.pending]:(state)=>{
            state.loading=true
            state.error=null
        },
        [login.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.user={...payload.user}
            state.token=payload.token
            state.isLogin=true
            state.loading=false
            state.error=null
        },
        [login.rejected]:(state,{payload})=>{

            state.error=payload
            state.loading=false
        },
        [logout.pending]:(state)=>{
            state.loading=true
            state.error=null
        },
        [logout.fulfilled]:(state,{payload})=>{
            state.user={...payload.user}
            state.token=payload.token
            state.isLogin=false
            state.loading=false
            state.error=null
        },
        [logout.rejected]:(state,{payload})=>{
            state.error=payload
            state.loading=false
        },
        [current.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [current.fulfilled]: (state, {payload}) => {
            console.log(payload);
            state.user = {...payload};
            state.loading = false;
            state.isLogin = true;            
        },
        [current.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;            
        },
    }

})


export default authSlice.reducer