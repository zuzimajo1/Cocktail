import { createSlice } from "@reduxjs/toolkit";

const DeleteOrderReducer = createSlice({
    name: "deleteOrder",
    initialState: {
        deleteOrderContainer: [],
    },
    reducers: {
        setDeletedOrder: (state, action)=>{
            state.deleteOrderContainer = action.payload;
        },
        addDeletedOrder: (state, action)=>{
            state.deleteOrderContainer.push(action.payload)
        },
        LogoutOrder: (state)=>{
            state.deleteOrderContainer = [];
        },
    }
})

export const { addDeletedOrder, setDeletedOrder, LogoutOrder } =
  DeleteOrderReducer.actions
export default DeleteOrderReducer.reducer;