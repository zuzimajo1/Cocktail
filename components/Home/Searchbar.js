import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Searchbar = (props) => {

  
  
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
          }}
        >
          <Ionicons name="wine-sharp" size={24} />
        </View>
        <TextInput
          placeholder="Search"
          style={{
            width: '65%',
            backgroundColor: '#eee',
            borderRadius: 20,
            fontWeight: '700',
            paddingHorizontal: 12,
          }}
          onChangeText={props.setSearch}
        />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 9,
            alignItems: 'center',
            borderRadius: 30,
            marginHorizontal: 1,
          }}
        >
          <Ionicons
            name="search-circle-sharp"
            size={18}
            style={{ marginRight: 6 }}
          />
          <Text>Search</Text>
        </View>
      </View>
    </View>
  )
}

export default Searchbar

const styles = StyleSheet.create({})