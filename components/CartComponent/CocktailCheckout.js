import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AddOrderCocktail } from '../../redux/Reducers/OrderReducer'
import { AddUserOrder, DeleteCocktailFromCart } from '../../redux/apiCalls'

export default function CocktailCheckout({ navigation }) {
  const [CheckOutClick, setCheckOutClick] = useState(false)
  const CocktailTotal = useSelector((state) => state.cart?.cartTotal)
  const CocktailOrders = useSelector((state) =>
    state.cart.cart.filter((items) => items.CocktailisCheck === true)
  )
  console.log(`This is the orders`, CocktailOrders)
  const dispatch = useDispatch()
  return (
    <>
      <View>
        {CheckOutClick && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={CheckOutClick}
            onRequestClose={() => setCheckOutClick(false)}
          >
            <CheckOutModal
              CocktailTotal={CocktailTotal}
              setCheckOutClick={setCheckOutClick}
              navigation={navigation}
              CocktailOrders={CocktailOrders}
              AddOrderCocktail={AddOrderCocktail}
              dispatch={dispatch}
            />
          </Modal>
        )}
        <CheckoutButton
          CocktailTotal={CocktailTotal}
          setCheckOutClick={setCheckOutClick}
        />
      </View>
    </>
  )
}

const CheckoutButton = (props) => (
  <>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontWeight: '700', fontSize: 17, color: '#422749' }}>
        Total:
      </Text>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 17,
          marginLeft: 8,
          color: 'black',
        }}
      >
        ₱{props.CocktailTotal}
      </Text>
      <Button
        title="Check Out"
        buttonStyle={{ backgroundColor: '#455A49', marginLeft: 16 }}
        onPress={() => props.setCheckOutClick(true)}
      />
    </View>
  </>
)

const CheckOutModal = (props) => {
  const [LocationDetail, setLocationDetail] = useState(null)
  const [NumberDetail, setNumberDetail] = useState(null)
  const date = new Date()
  const username = useSelector((state) => state.user.userContainer.username)
  const HandlePlaceOrder = () => {
    if (LocationDetail && NumberDetail) {
      props.setCheckOutClick(false)
      props.navigation.navigate('CheckOutDone', {
        CocktailItemsPlaceOrder: props.CocktailOrders,
      })
      AddUserOrder(props.dispatch, {
        orderID: date.getTime() + date.getDate(),
        username,
        LocationDetail,
        NumberDetail,
        CocktailContainerItems: props.CocktailOrders.map((items)=> items)
      })
      DeleteCocktailFromCart(props.dispatch, username)
      
    }
  }
  console.log(NumberDetail)

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <View style={{ backgroundColor: 'white', width: '80%', height: 'auto' }}>
        <View style={{ padding: 32, position: 'relative' }}>
          <Text
            style={{ textAlign: 'center', fontSize: 17, fontWeight: '700' }}
          >
            Please input your details
          </Text>
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>Address</Text>
            <TextInput
              placeholder="Enter your location"
              style={{
                width: '100%',
                backgroundColor: '#eee',
                paddingVertical: 12,
                fontWeight: '700',
                paddingHorizontal: 12,
                marginTop: 6,
                marginBottom: 12,
                borderColor: 'red',
              }}
              onChangeText={setLocationDetail}
            />
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Mobile Number
            </Text>
            <TextInput
              placeholder="Enter your mobile number"
              style={{
                width: '100%',
                backgroundColor: '#eee',
                marginTop: 6,
                marginBottom: 12,
                fontWeight: '700',
                paddingVertical: 12,
                paddingHorizontal: 12,
              }}
              onChangeText={setNumberDetail}
            />
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Mode of Payment
            </Text>
            <Text style={{ fontWeight: '700', marginTop: 6, marginBottom: 12 }}>
              Cash on Delivery
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Total Payment
            </Text>
            <Text style={{ fontWeight: '700', marginTop: 6 }}>
              ₱{props.CocktailTotal}
            </Text>
          </View>
          <Button
            title="Place Order"
            buttonStyle={{ backgroundColor: '#455A49' }}
            onPress={HandlePlaceOrder}
          />
          <View style={{ position: 'absolute', top: 16, right: 16 }}>
            <TouchableOpacity onPress={() => props.setCheckOutClick(false)}>
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
