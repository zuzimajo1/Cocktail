import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'

export default function ViewProfilePic({navigation}) {
  const UserImage = useSelector((state) => state.user.userContainer.img);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#51595E" />
          <Text style={{ color: '#51595E', fontSize: 18 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
          marginTop: 116,
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: UserImage }}
          style={{ width: '100%', height: '60%' }}
        ></Image>
      </View>
    </SafeAreaView>
  )
}
