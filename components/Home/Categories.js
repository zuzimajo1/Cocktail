import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'


const items = [
  {
    title: 'Old-Fashioned',
    img: require('../../assets/images/old-fashioned.png'),
  },
  {
    title: 'Negroni',
    img: require('../../assets/images/negroni.png'),
  },
  {
    title: 'Wishkey-Sour',
    img: require('../../assets/images/whiskey-sour.png'),
  },
  {
    title: 'Dry-Martini',
    img: require('../../assets/images/dry-martini.png'),
  },
  {
    title: 'Daiquiri',
    img: require('../../assets/images/daiquiri.png'),
  },
  {
    title: 'Margarita',
    img: require('../../assets/images/margarita.png'),
  },

  {
    title: 'Manhattan',
    img: require('../../assets/images/manhattan.png'),
  },
  {
    title: 'Moscow Mule',
    img: require('../../assets/images/moscowmule.png'),
  },
]

const Categories = () => {
  return (
    <View
      style={{ paddingVertical: 10, marginTop: 5, backgroundColor: '#fff' }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((items, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
          >
            <Image
              source={items.img}
              style={{ width: 50, height: 40, resizeMode: 'contain' }}
            ></Image>
            <Text style={{ fontSize: 13, fontWeight: '900' }}>
              {items.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({})