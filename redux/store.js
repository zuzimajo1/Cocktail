import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage'
import CartReducer from './Reducers/CartReducer'
import CocktailReducer from './Reducers/CocktailReducer'
import OrderReducer from './Reducers/OrderReducer'
import UserReducer from './Reducers/UserReducer'
import DeleteOrderReducer from './Reducers/DeleteOrderReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  cart: CartReducer,
  cocktail: CocktailReducer,
  order: OrderReducer,
  user: UserReducer,
  deleteOrder : DeleteOrderReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
