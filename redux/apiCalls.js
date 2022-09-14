import { PublicRequest } from '../RequestMethod'
import {
  LoginUserStart,
  LoginUserFailure,
  LoginUserSuccess,
} from './Reducers/UserReducer'
// import { useSelector } from 'react-redux'
import {
  AddCartItem,
  ChangeCocktailCheck,
  UpdateCocktailCart,
  AddUpdatedItem,
  SetCocktailCart,
  DeleteCocktailItem,
} from './Reducers/CartReducer'

import {
  AddOrderCocktail,
  SetOrderCocktail,
  DeleteOrderCocktail,
} from './Reducers/OrderReducer'
import { addDeletedOrder, setDeletedOrder } from './Reducers/DeleteOrderReducer'



export const LoginUser = async (dispatch, userData) => {
  dispatch(LoginUserStart())
  try {
    const res = await PublicRequest.post('auth/login', userData)
    dispatch(LoginUserSuccess(res.data))
  } catch (error) {
    dispatch(LoginUserFailure())
  }
}

export const ChangeImageUser = async (dispatch, image, UserID) => {
  try {
    const res = await PublicRequest.patch(`user/update/${UserID}`, image)
    dispatch(LoginUserSuccess(res.data))
  } catch (error) {
   
  }
}

export const AddCartUser = async (dispatch, data, datacocktailID, cartItems) => {
  try {
    const index = cartItems.find((item) => item.cocktailID === datacocktailID)
    if (!index) {
      const res = await PublicRequest.post('cart', data)
      dispatch(AddCartItem(res.data))
    } else {
      const res2 = await PublicRequest.patch(`cart/update/${index._id}`, {
        quantity: index.quantity + 1,
        subTotal: index.subTotal + index.cocktailPrice,
      })
      dispatch(AddUpdatedItem(res2.data))
    }
  } catch (error) {
   
  }
}

export const UpdateCocktail = async (dispatch, data, CocktailID, condition, setLoadingScreen)=>{
    try {
        const res = await PublicRequest.patch(`cart/update/${CocktailID}`, data)
        dispatch(UpdateCocktailCart({...res.data, condition}))
        setLoadingScreen(true);
    } catch (error) {
        
    }
}

export const getCocktailsCart = async (dispatch, username)=>{
    try {
        const res = await PublicRequest.get(`cart/Cart/${username}`);
        dispatch(SetCocktailCart(res.data));
    } catch (error) {
        
    }
}

export const UpdateCocktailCheck = async (dispatch, cocktailID, Checkbox)=>{
    try {
        const res = await PublicRequest.patch(`cart/update/${cocktailID}`, {
          CocktailisCheck: Checkbox,
        })
        dispatch(ChangeCocktailCheck({ ...res.data, cocktailID, Checkbox }))

    } catch (error) {
        
    }
}

export const DeleteCocktail = async (dispatch, cocktailID, Checkbox, setLoadingScreen)=>{
    try {
        const res = await PublicRequest.delete(`cart/deleteCart/${cocktailID}`);
        dispatch(DeleteCocktailItem({...res.data, Checkbox}));
        setLoadingScreen(true);
    } catch (error) {
        
    }
}

export const AddUserOrder = async (dispatch, dataOrder)=>{
    try {
        const res = await PublicRequest.post('order', dataOrder);
        dispatch(AddOrderCocktail(res.data));
    } catch (error) {
        
    }
}


export const getCocktailOrders = async (dispatch, username)=>{
  try {
      const res = await PublicRequest.get(`order/Order/${username}`);
      dispatch(SetOrderCocktail(res.data));
  } catch (error) {
    
  }
}

export const deleteCocktailOrder = async (dispatch, cocktailID)=>{
  try {
      const res = await PublicRequest.delete(`order/deleteOrder/${cocktailID}`);
      dispatch(DeleteOrderCocktail(res.data));
  } catch (error) {
    
  }
}


export const AddToDeleteCocktails = async (dispatch, data)=>{
  try {
      const res = await PublicRequest.post('deleteOrder', data);
      dispatch(addDeletedOrder(res.data));
  } catch (error) {
    
  }
}

export const GetDeleteCocktails = async (dispatch, username)=>{
  try {
      const res = await PublicRequest.get(`deleteOrder/DeleteOrderByUsername/${username}`);
      dispatch(setDeletedOrder(res.data));
  } catch (error) {
    
  }
}


export const DeleteCocktailFromCart = async (dispatch, username)=>{
  try {
    const res = await PublicRequest.delete(`cart/deleteManycart/${username}`);
  } catch (error) {
    
  }
}