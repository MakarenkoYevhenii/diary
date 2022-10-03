import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../share/auth';


export const signup=createAsyncThunk(
    "auth/signup",
    async(data,{rejectWithValue})=>{
        try {
            const result=await authApi.Login(data)
            return result
        } catch (error) {

          return  rejectWithValue(error)
        }
    }
)


export const login=createAsyncThunk(
    "auth/login",
    async(data,{rejectWithValue})=>{
        try {
            const result=await authApi.login(data)
            return result
        } catch (error) {

          return  rejectWithValue(error)
        }
    }
)
export const logout=createAsyncThunk(
    "auth/logout",
    async(_,{rejectWithValue})=>{
        try {
            const result=await authApi.Login()

            return result
        } catch (error) {
            console.log(error);
          return  rejectWithValue(error)
        }
    }
)


export const current = createAsyncThunk(
    "auth/current",
    async (_, {getState, rejectWithValue}) => {
        try {
            const {auth} = getState();
            const result = await authApi.Login(auth.token);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
    {
        condition: (_, {getState}) => {
            const {auth} = getState();
            if(!auth.token) {
                return false;
            }
        }
    }
)