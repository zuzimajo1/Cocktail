/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Search from './screens/Search'
import Account from './screens/Account'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { persistor, store } from './redux/store'
import ReduxStore from './redux/store'
import CocktailsDetails from './screens/CocktailsDetails'
import Cart from './screens/Cart'
import CheckOutDone from './screens/CheckOutDone'
import Order from './screens/Order'
import OrderItems from './components/OrderComponent/OrderItems'
import ViewProfilePic from './screens/ViewProfilePic'
import Login from './screens/Login'
import Register from './screens/Register'
import RNBootSplash from 'react-native-bootsplash'

const App = () => {
  const Stack = createNativeStackNavigator()
  const isDarkMode = useColorScheme() === 'dark'
  const screenOptions = {
    headerShown: false,
  }


  return (
    <Provider store={store}>
      <AppWrapper
        Stack={Stack}
        screenOptions={screenOptions}
      />
    </Provider>
  )
}


const AppWrapper = ({ Stack, screenOptions }) => {
  const isSignedIn = useSelector((state) => state.user?.userLogin)
  const dispatch = useDispatch()
  


  return (
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={screenOptions}
          >
            {isSignedIn ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SearchTab" component={Search} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen
                  name="CocktailsDetails"
                  component={CocktailsDetails}
                />
                <Stack.Screen name="CartTab" component={Cart} />
                <Stack.Screen name="CheckOutDone" component={CheckOutDone} />
                <Stack.Screen name="OrderTab" component={Order} />
                <Stack.Screen name="OrderItems" component={OrderItems} />
                <Stack.Screen
                  name="ViewProfilePic"
                  component={ViewProfilePic}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PersistGate>
  )
}


export default App
