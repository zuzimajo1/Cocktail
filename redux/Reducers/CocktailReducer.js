import { createSlice } from "@reduxjs/toolkit"

const CocktailReducer = createSlice({
  name: 'cocktails',
  initialState: {
    CocktailContainer: [],
    CocktailSuccess: false,
    CocktailFailed: false,
  },
  reducers: {
    SetCocktailContainer: (state, action) => {
      state.CocktailContainer = action.payload
      state.CocktailSuccess = true
      state.CocktailFailed = false
    },
    DeleteCocktail :(state)=>{
      state.CocktailContainer = [];
    }
  },
})

export const { SetCocktailContainer, DeleteCocktail } = CocktailReducer.actions
export default CocktailReducer.reducer;