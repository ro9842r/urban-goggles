
import { configureStore, createSlice } from "@reduxjs/toolkit";

const sntimentSlice = createSlice({
    name: 'sentiment',
    initialState: {
        text: "", result: null,loading: false, error: null
    },
    reducers: {
        setText: (state, action) => {state.text = action.payload},
         fetchStart: (state)=> {state.loading = true; state.error = null},
         fetchSuccess: (state, action) => {
           state.loading = false;
           state.result = action.payload;
    },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
    }
    }, 
   
})

export const {setText, fetchStart, fetchSuccess, fetchError} = sntimentSlice.actions;

export const store  = configureStore({reducer: {
    sentiment: sntimentSlice.reducer
}});
