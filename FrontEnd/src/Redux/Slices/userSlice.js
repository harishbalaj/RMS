import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
const initialState = {} 
export const handleStoreUser = createAsyncThunk("handleStoreUser",
    
     async (data,{dispatch}) => {
        console.log('handleStoreUser')
        console.log(data,'handleStoreUser')
         dispatch(getUser(data))
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state = action.payload
            return state
        },
    }
})

export const {getUser} = userSlice.actions
export default userSlice.reducer