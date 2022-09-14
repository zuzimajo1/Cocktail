import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-elements'

export default function OrderItems({ route, navigation }) {

    const { LocationDetail, NumberDetail, OrderViewCocktails, OrderID } =
      route.params
    const OrderViewCocktailTotal = OrderViewCocktails.map(
      (items) => items.subTotal
    ).reduce((prev, current) => prev + current, 0)

  return (
    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 2,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#51595E" />
          <Text style={{ color: '#51595E', fontSize: 18 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 24,
            paddingHorizontal: 16,
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '500' }}>ORDER NO:</Text>
            <Text style={{ fontSize: 17, marginLeft: 5, fontWeight: '500' }}>
              {OrderID}
            </Text>
          </View>
          <View
            style={{ width: '100%', marginTop: 20, backgroundColor: 'white' }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/LocationGif.gif')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ fontSize: 17, fontWeight: '500', marginLeft: 8 }}>
                Address
              </Text>
            </View>
            <Text style={{ fontWeight: '400', fontSize: 17, marginLeft: 48 }}>
              {LocationDetail}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/PhoneGif2.gif')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ fontSize: 17, fontWeight: '500', marginLeft: 8 }}>
                Cellphone Number
              </Text>
            </View>
            <Text style={{ fontWeight: '400', fontSize: 17, marginLeft: 48 }}>
              {NumberDetail}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/PaymentCard.gif')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ fontSize: 17, fontWeight: '500', marginLeft: 8 }}>
                Method of Payment
              </Text>
            </View>
            <Text style={{ fontWeight: '400', fontSize: 17, marginLeft: 48 }}>
              Cash on Delivery
            </Text>
          </View>
          <View style={{ marginVertical: 24 }}>
            {OrderViewCocktails.map((items, index) => (
              <OrderItemsView key={index} items={items} />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '500', marginRight: 8 }}>
              Total:
            </Text>
            <Text style={{ fontSize: 17, fontWeight: '500' }}>
              ₱{OrderViewCocktailTotal}
            </Text>
          </View>
          <Button
            title="Done"
            buttonStyle={{
              backgroundColor: '#5D67EA',
              width: 112,
              marginTop: 10,
              paddingBottom: 10,
              alignSelf: 'center',
            }}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </ScrollView>
    </View>
  )
}


export const OrderItemsView = (props) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Image
          source={{uri:props.items.cocktailImage}}
          alt={props.items.cocktailTitle}
          style={{ width: 90, height: 90, borderRadius: 6 }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 16,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '500' }}>
            {props.items.cocktailTitle}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>
            {props.items.cocktailCategory}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>
            {props.items.quantity} pieces
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>
            ₱{props.items.cocktailPrice}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          ₱{props.items.subTotal}
        </Text>
      </View>
    </View>
  )
}

