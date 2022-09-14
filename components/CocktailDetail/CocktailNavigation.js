import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function CocktailNavigation({navigation}) {
  return (
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
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('CartTab')}
      >
        <Text style={{ color: '#51595E', fontSize: 18 }}>Cart</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#51595E" />
      </TouchableOpacity>
    </View>
  )
}