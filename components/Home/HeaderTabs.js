import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const HeaderTabs = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingVertical: 8,
      }}
    >
      <HeaderButton
        text="Alcoholic"
        btnColor="black"
        textColor="white"
        active={props.ActiveTab}
        setactive={props.setActiveTab}
      />
      <HeaderButton
        text="Non alcoholic"
        btnColor="white"
        textColor="black"
        active={props.ActiveTab}
        setactive={props.setActiveTab}
      />
    </View>
  )
}

const HeaderButton = ({ text, btnColor, textColor, active, setactive }) => (
  <View>
    <TouchableOpacity
      style={{
        backgroundColor: text === active ? 'black' : 'white',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
      }}
      onPress={() => setactive(text)}
    >
      <Text
        style={{
          color: text === active ? 'white' : 'black',
          fontWeight: '900',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  </View>
)

export default HeaderTabs

const styles = StyleSheet.create({})