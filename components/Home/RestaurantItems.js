import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const RestaurantItems = ({ navigation, restaurantData }) => {
  if (!restaurantData) {
    return (
      <View
        style={{
          width: '100%',
          height: 450,
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
    <>
      {restaurantData?.map((items, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate('CocktailsDetails', {
              cocktailImage: items.strDrinkThumb,
              cocktailTitle: items.strDrink,
              cocktailInfo: items.strAlcoholic,
              cocktailGlass: items.strGlass,
              cocktailCategory: items.strCategory,
              cocktailIngredients1: items.strIngredient1,
              cocktailIngredients2: items.strIngredient2,
              cocktailIngredients3: items.strIngredient3,
              cocktailIngredients4: items.strIngredient4,
              cocktailIngredients5: items.strIngredient5,
              cocktailInstructions: items.strInstructions,
              cocktailPrice: Number(items.idDrink),
            })
          }
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: 'white' }}
          >
            <RestaurantImage image={items.strDrinkThumb} />
            <RestaurantInfo
              rating
              name={items.strDrink}
              category={items.strCategory}
            />
          </View>
        </TouchableOpacity>
      ))}
    </>
  )
}


const RestaurantImage = ({ image }) => (
  <>
    <Image source={{ uri: image}} style={{ width: '100%', height: 200 }}></Image>
    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
)


const RestaurantInfo = ({ name, category }) => (
  <View
    style={{
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{name}</Text>
      <Text style={{ fontSize: 13, color: 'gray' }}>{category}</Text>
    </View>
    <View
      style={{
        backgroundColor: 'white',
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text></Text>
    </View>
  </View>
)


export default RestaurantItems

const styles = StyleSheet.create({})