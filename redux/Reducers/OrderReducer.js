import { createSlice } from "@reduxjs/toolkit";

const OrderReducer = createSlice({
  name: 'order',
  initialState: {
    orderContainer: [],
    orderSuccess: false,
    orderError: false,
  },
  reducers: {
    SetOrderCocktail: (state, action) => {
      state.orderContainer = action.payload
    },
    AddOrderCocktail: (state, action) => {
      state.orderContainer.push(action.payload)
    },
    DeleteOrderCocktail: (state, action) => {
      state.orderContainer = state.orderContainer.filter(
        (items) => items._id !== action.payload._id
      )
    },
  
  },
})

export const {
  AddOrderCocktail,
  DeleteOrderCocktail,
  SetOrderCocktail,
} = OrderReducer.actions
export default OrderReducer.reducer;