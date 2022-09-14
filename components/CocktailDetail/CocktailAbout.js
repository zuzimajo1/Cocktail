import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'


export default function CocktailAbout({ route }) {
     const {
       cocktailImage,
       cocktailTitle,
       cocktailInfo,
       cocktailGlass,
       cocktailCategory,
       cocktailInstructions,
       cocktailIngredients1,
       cocktailIngredients2,
       cocktailIngredients3,
       cocktailIngredients4,
       cocktailIngredients5,
       cocktailPrice,
     } = route.params

     const ingredientsarray = [
       cocktailIngredients1,
       cocktailIngredients2,
       cocktailIngredients3,
       cocktailIngredients4,
       cocktailIngredients5,
     ]
  return (
    <View style={{width: "100%", paddingBottom: 50}}>
      <CockTailImage image={cocktailImage} />
      <View
        style={{
          paddingHorizontal: 12,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <ViewInformation title="cocktail name" info={cocktailTitle} />
        <ViewInformation title="glass" info={cocktailGlass} />
        <ViewInformation title="info" info={cocktailInfo} />
        <ViewInformation title="category" info={cocktailCategory} />
        <ViewInformation
          title="ingredients"
          info={ingredientsarray?.map((items) => items).join(', ')}
        />
        <ViewInformation
          title="Instructions"
          info={cocktailInstructions}
        />
        <ViewInformation title="price" info={`₱${cocktailPrice}`} />
      </View>
    </View>
  )
}

const CockTailImage = (props) => (
  <Image style={{ width: '100%', height: 200 }} source={{uri: props.image}}></Image>
)

const ViewInformation = (props) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: "center",
      marginVertical: 5,
      width: "100%",
      height: "auto",
      flexWrap: "wrap",
    }}
  >
    <Text
      style={{
        paddingHorizontal: 8,
        paddingVertical: 6,
        textTransform: 'capitalize',
        backgroundColor: '#455A49',
        borderRadius: 4,
        color: '#fff',
        justifyContent: "flex-start",
        marginRight: 10,
        fontSize: 16,
        height: "auto"
      }}
    >
      {`${props.title}:`}
    </Text>
    <Text style={{ fontSize: 16 }}>{props.info}</Text>
  </View>
)
