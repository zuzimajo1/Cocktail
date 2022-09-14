import { View, Text } from 'react-native'
import React from 'react'

export default function TitleHeader(props) {
  return (
    <View
      style={{
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderBottomColor: '#C5D1D5',
        borderBottomWidth: 1,
      }}
    >
      <Text style={{ fontWeight: '700', fontSize: 20, textAlign: 'center', textTransform: "capitalize" }}>
        {props.titleheader}
      </Text>
    </View>
  )
}