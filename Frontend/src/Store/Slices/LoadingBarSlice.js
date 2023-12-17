import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loadingProgress : 0
}
const LoadingBar = createSlice({
    name: "LoadingBar",
    initialState,
    reducers:{
        setLoadingProgress : (state , action)=>{
            
            state.loadingProgress = action.payload;
        }
    }
})
export const {setLoadingProgress} = LoadingBar.actions;
export default LoadingBar.reducer;