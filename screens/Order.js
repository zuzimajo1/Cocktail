import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider } from 'react-native-elements'
import TitleHeader from '../components/TitleHeader'
import BottomTabs from './BottomTabs'
import { useSelector, useDispatch } from 'react-redux'
import { RemoveOrderCocktail } from '../redux/Reducers/OrderReducer'
import { AddToDeleteCocktails, deleteCocktailOrder } from '../redux/apiCalls'

export default function Order({ navigation }) {
  const [DefaultText, setDefaultText] = useState('Order')
  const Orders = useSelector((state) => state.order?.orderContainer)
  const dispatch = useDispatch()

  useEffect(() => {
    setDefaultText('Order')
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <View style={{ width: '100%', background: 'white', padding: 1 }}>
        <TitleHeader titleheader="order" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <OrdersItem dispatch={dispatch} Orders={Orders} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} DefaultText={DefaultText} />
    </SafeAreaView>
  )
}

const OrdersItem = (props) => {

  if (props.Orders.length === 0) {
    return (
      <View
        style={{
          width: '100%',
          height: 450,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          Empty Order
        </Text>
      </View>
    )
  }

  return (
    <View style={{ paddingHorizontal: 15, width: '100%', paddingVertical: 15 }}>
      {props.Orders.map((items, index) => (
        <OrderCocktailView
          key={index}
          items={items}
          dispatch={props.dispatch}
          RemoveOrderCocktail={RemoveOrderCocktail}
          navigation={props.navigation}
        />
      ))}
    </View>
  )
}

const OrderCocktailView = (props) => {
  const cocktailquantity = props.items.CocktailContainerItems.map(
    (items) => items.quantity
  ).reduce((prev, current) => prev + current, 0)
  const cocktailAllTotal = props.items.CocktailContainerItems.map(
    (items) => items.subTotal
  ).reduce((prev, current) => prev + current, 0)
  const date = new Date();
  const username = useSelector(state=>state.user.userContainer.username);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: '#D2E2E7',
          borderBottomWidth: 1,
          borderTopWidth: 1,
          marginBottom: 17,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 3,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Order ID: </Text>
            <Text style={{ fontSize: 16, marginLeft: 5 }}>
              {props.items.orderID}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 3,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              Order Total Quantity:
            </Text>
            <Text style={{ fontSize: 16, marginLeft: 5 }}>
              {cocktailquantity}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 3,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              Order Total:
            </Text>
            <Text style={{ fontSize: 16, marginLeft: 5 }}>
              {' '}
              ₱{cocktailAllTotal}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ marginVertical: 3 }}
            onPress={() => {
              props.navigation.navigate('OrderItems', {
                OrderViewCocktails: props.items.CocktailContainerItems,
                LocationDetail: props.items.LocationDetail,
                NumberDetail: props.items.NumberDetail,
                OrderID: props.items.orderID,
              })
            }}
          >
            <Text style={{ fontSize: 16 }}>View Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginVertical: 3 }}
            onPress={() => {
              deleteCocktailOrder(props.dispatch, props.items._id)
              AddToDeleteCocktails(props.dispatch, {
                OrderID: date.getTime(),
                username,
                DeleteOrderItem: props.items.CocktailContainerItems,
              })
            }}
          >
            <Text style={{ fontSize: 16 }}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
