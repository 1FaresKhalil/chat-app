import {configureStore} from "@reduxjs/toolkit";
import userSlice from '../src/components/slices/userSlice'

export const store = configureStore({
    reducer:{
        "user": userSlice,
    }
})