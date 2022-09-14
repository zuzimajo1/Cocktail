import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
// import { ChangeCartItem } from '../redux/reducer/CartReducer'
import { ChangeCartItem } from '../redux/Reducers/CartReducer'
import { Button } from 'react-native-elements'

export default function CheckOutDone({ route, navigation }) {
     const dispatch = useDispatch()
     const { CocktailItemsPlaceOrder } = route.params
     const TotalOrder = CocktailItemsPlaceOrder.map(
       (items) => items.subTotal
     ).reduce((prev, current) => prev + current, 0)

       useEffect(() => {
         dispatch(ChangeCartItem())
       }, [CocktailItemsPlaceOrder])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Image
          source={require('../assets/images/CheckCocktail.gif')}
          alt="Check"
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontWeight: '600', fontSize: 17 }}>
          Your order has been placed for ₱{TotalOrder}
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', paddingHorizontal: 14, paddingVertical: 14 }}
        >
          {CocktailItemsPlaceOrder.map((items, index) => (
            <OrdersCocktail key={index} items={items} />
          ))}
        </ScrollView>
        <Image
          source={require('../assets/images/CocktailGif.gif')}
          style={{ width: 180, height: 180 }}
        />
        <Button
          title="Done"
          buttonStyle={{
            backgroundColor: '#5D67EA',
            width: 112,
            marginTop: 14,
            paddingBottom: 10,
          }}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  )
}

const OrdersCocktail = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
      }}
    >
      <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>
          {props.items.cocktailTitle}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 6, marginBottom: 3 }}>
          {props.items.cocktailInfo}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 3 }}>
          {props.items.quantity}x
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '400' }}>
          ₱{props.items.subTotal}
        </Text>
      </View>
      <Image
        source={{uri: props.items.cocktailImage}}
        style={{ width: 90, height: 90, borderRadius: 5 }}
      />
    </View>
  )
}
