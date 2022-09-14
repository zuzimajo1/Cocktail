import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import BottomTabs from './BottomTabs'
import CartItems from '../components/CartComponent/CartItems'
import TitleHeader from '../components/TitleHeader'
import CocktailCheckout from '../components/CartComponent/CocktailCheckout'
import { useSelector } from 'react-redux'



export default function Cart({ navigation }) {
  const [DefaultText, setDefaultText] = useState('Cart')
  const cart = useSelector((state) => state.cart.cart)
  const cartValidator = cart.some((item) => item.CocktailisCheck === true)

  useEffect(() => {
    setDefaultText('Cart')
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <View style={{ width: '100%', background: 'white', padding: 1 }}>
        <TitleHeader titleheader="cart"/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <CartItems />
      </ScrollView>
      {cartValidator && (
        <>
          <Divider width={1} />
          <CocktailCheckout navigation={navigation} />
        </>
      )}
      <Divider width={1} />
      <BottomTabs navigation={navigation} DefaultText={DefaultText} />
    </SafeAreaView>
  )
}
