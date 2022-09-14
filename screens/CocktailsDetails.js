import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import CocktailAbout from '../components/CocktailDetail/CocktailAbout'
import AddCart from '../components/CocktailDetail/AddCart'
import CocktailNavigation from '../components/CocktailDetail/CocktailNavigation'

export default function CocktailsDetails({ route, navigation }) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <CocktailNavigation navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <CocktailAbout route={route} />
        </ScrollView>
        <AddCart route={route} />
      </View>
    </SafeAreaView>
  )
}