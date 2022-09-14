import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import BottomTabs from './BottomTabs'
import AccountHeader from '../components/AccountComponent/AccountHeader'
import AccountDataContent from '../components/AccountComponent/AccountDataContent'


export default function Account({ navigation }) {
  const [DefaultText, setDefaultText] = useState('Account')

 

  useEffect(() => {
    setDefaultText('Account')
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <AccountHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AccountDataContent navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} DefaultText={DefaultText} />
    </SafeAreaView>
  )
}
