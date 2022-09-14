import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatGrid } from 'react-native-super-grid'
import CocktailSearchBar from './CocktailSearchBar'
import BottomTabs from '../../screens/BottomTabs'
import { useSelector } from 'react-redux'

export default function CocktailSearches({ navigation, SearchComponentContainer ,setSearchComponentCocktail }) {

  const cocktails = useSelector((state) => state.cocktail.CocktailContainer)
  if(!cocktails){
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Search not found
        </Text>
      </View>
    )
  }



  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ImageCocktails navigation={navigation} cocktails={cocktails} />
    </View>
  )
}

const ImageCocktails = (props) => (
  <FlatGrid
    itemDimension={120}
    data={props.cocktails}
    spacing={0}
    style={{ width: '100%', marginBottom: 50 }}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('CocktailsDetails', {
            cocktailImage: item.strDrinkThumb,
            cocktailTitle: item.strDrink,
            cocktailInfo: item.strAlcoholic,
            cocktailGlass: item.strGlass,
            cocktailCategory: item.strCategory,
            cocktailIngredients1: item.strIngredient1,
            cocktailIngredients2: item.strIngredient2,
            cocktailIngredients3: item.strIngredient3,
            cocktailIngredients4: item.strIngredient4,
            cocktailIngredients5: item.strIngredient5,
            cocktailInstructions: item.strInstructions.split('.')[0],
            cocktailPrice: Number(item.idDrink),
          })
        }
      >
        <Image
          style={{ width: 120, height: 120 }}
          source={{ uri: item.strDrinkThumb }}
          alt={item.strGlass}
        ></Image>
      </TouchableOpacity>
    )}
  />
)

