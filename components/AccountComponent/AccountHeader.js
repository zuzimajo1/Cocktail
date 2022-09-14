import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AccountHeader = () => {
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
      <Text style={{ fontWeight: '700', fontSize: 20, textAlign: 'center' }}>
        Profile
      </Text>
    </View>
  )
}

export default AccountHeader

const styles = StyleSheet.create({})