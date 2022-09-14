import { createSlice } from "@reduxjs/toolkit"

const CartReducer = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartSucess: false,
    cartError: false,
    cartTotal: 0,
  },
  reducers: {
    SetCocktailCart: (state, action) => {
      state.cart = action.payload
    },
    AddCartItem: (state, action) => {
      state.cart.push(action.payload)
    },
    AddUpdatedItem: (state, action) => {
      state.cart[
        state.cart.findIndex(
          (items) => items.cocktailID === action.payload.cocktailID
        )
      ] = action.payload
    },
    ChangeCocktailCheck: (state, action) => {
      //Determine if the itemID is equal to the pass CocktailID
      state.cart.map((items) => {
        if (items._id === action.payload.cocktailID) {
          if (action.payload.Checkbox === true) {
            items.CocktailisCheck = action.payload.Checkbox
            state.cartTotal += action.payload.subTotal
          } else if (action.payload.Checkbox === false) {
            items.CocktailisCheck = action.payload.Checkbox
            state.cartTotal -= action.payload.subTotal
          }
        }
      })
    },
    ChangeCartItem: (state) => {
      state.cart = state.cart.filter((items) => items.CocktailisCheck === false)
      state.cartTotal = 0
    },
    UpdateCocktailCart: (state, action) => {
      state.cart.map((items) => {
        if (items._id === action.payload._id) {
          //if true, determine if the condition is increase
          if (action.payload.condition === 'increase') {
            ;(items.subTotal = items.cocktailPrice * action.payload.quantity),
              (items.quantity = action.payload.quantity)
            if (action.payload.CocktailisCheck) {
              state.cartTotal += action.payload.cocktailPrice
            }
            //determine if the condition is decrease
          } else if (action.payload.condition === 'decrease') {
            ;(items.subTotal = items.cocktailPrice * action.payload.quantity),
              (items.quantity = action.payload.quantity)
            if (action.payload.CocktailisCheck) {
              state.cartTotal -= action.payload.cocktailPrice
            }
          }
        }
      })
    },
    DeleteCocktailItem: (state, action) => {
      state.cart.map((items) => {
        if (items._id === action.payload._id) {
          if (action.payload.Checkbox) {
            state.cartTotal -= action.payload.subTotal
          }
        }
      })
      state.cart = state.cart.filter(
        (items) => items._id !== action.payload._id
      )
    },
  },
})

export const {
  AddCartItem,
  AddUpdatedItem,
  SetCocktailCart,
  UpdateCocktailCart,
  RemoveCartItem,
  AddQuantityCocktail,
  ChangeCocktailCheck,
  ChangeCartItem,
  DeleteCocktailItem,
} = CartReducer.actions
export default CartReducer.reducer;