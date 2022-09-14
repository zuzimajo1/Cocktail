import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-elements'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { LoginUser } from '../redux/apiCalls'
import { useDispatch } from 'react-redux'

export default function Login({ navigation }) {
  const [Screen, setScreen] = useState('Login')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/signupbackground3.jpg')}
        
        style={{ width: '100%', height: '100%', justifyContent: 'center' }}
      >
        <View
          style={{
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            paddingHorizontal: 24,
          }}
        >
          <LoginNavigation navigation={navigation} Screen={Screen} />
          <LoginHeader />
          <LoginForm />
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}



const LoginNavigation = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 12,
      }}
    >
      <View
        style={{
          backgroundColor: props.Screen === 'Login' ? '#353335' : 'black',
          marginHorizontal: 10,
          width: 100,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 40,
        }}
      >
        <Text
          style={{
            textTransform: 'uppercase',
            color: props.Screen === 'Login' ? 'white' : '#8D868E',
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          login
        </Text>
      </View>

      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <View
          style={{
            backgroundColor: props.Screen === 'Register' ? '#353335' : 'black',
            marginHorizontal: 10,
            width: 100,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textTransform: 'uppercase',
              color: props.Screen === 'Register' ? 'white' : '#8D868E',
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            register
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const LoginHeader = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 48,
        }}
      >
        <Ionicons name="wine" size={60} color="#253380" />
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 22 }}>
          CocktailShop
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          fontWeight: '700',
          fontSize: 22,
          marginLeft: 12,
          paddingRight: 12,
        }}
      >
        Order your favorite cocktail anytime, anywhere!
      </Text>
    </>
  )
}

const LoginForm = () => {
  const [ShowPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const HandleButtonLogin =  ()=>{
    if(username && password){
      LoginUser(dispatch, {
        username,
        password
      })
    }else{
      console.log("Please don't omit any details")
    }
  }



  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 12,
        paddingBottom: 24,
      }}
    >
      <View style={{ marginTop: 18 }}>
        <Text
          style={{
            textTransform: 'uppercase',
            color: 'white',
            fontSize: 12,
            paddingBottom: 6,
          }}
        >
          Username
        </Text>
        <TextInput
          style={{
            width: '100%',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderColor: 'white',
            borderWidth: 1,
            color: 'white',
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(71, 73, 74, 0.7)',
          }}
          onChangeText={setUsername}
        />
        <Text
          style={{
            textTransform: 'uppercase',
            color: 'white',
            fontSize: 12,
            marginTop: 12,
            paddingBottom: 6,
          }}
        >
          Password
        </Text>
        <TextInput
          style={{
            width: '100%',
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: 'rgba(71, 73, 74, 0.7)',
            borderRadius: 18,
            borderWidth: 1,
            borderColor: 'white',
            color: 'white',
            height: 36,
          }}
          secureTextEntry={ShowPassword ? false : true}
          onChangeText={setPassword}

        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 8,
          }}
        >
          <BouncyCheckbox
            size={18}
            fillColor="#433C43"
            unfillColor="#FFFFFF"
            iconStyle={{ borderRadius: 4 }}
            onPress={() => setShowPassword(!ShowPassword)}
          />
          <Text style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            Show Password
          </Text>
        </View>
        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: '#6283FD',
            width: 112,
            marginTop: 14,
            paddingBottom: 10,
            alignSelf: 'center',
            borderRadius: 4,
          }}
          onPress={HandleButtonLogin}
        />
        {/* <Text
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 16,
            marginVertical: 15,
          }}
        >
          or
        </Text>

        <Button
          title="Login with Facebook"
          icon={
            <Ionicons
              name="logo-facebook"
              size={25}
              style={{ marginRight: 76, color: '#0F1273' }}
            />
          }
          buttonStyle={{
            backgroundColor: '#4C5D9C',
            width: '100%',
            marginTop: 14,
            paddingBottom: 10,
            justifyContent: 'flex-start',
            borderRadius: 10,
            paddingHorizontal: 20,
          }}
        />
        <Button
          title="Login with Gmail"
          icon={
            <Ionicons
              name="logo-google"
              size={25}
              style={{ marginRight: 84, color: '#73180F' }}
            />
          }
          buttonStyle={{
            backgroundColor: '#EA4335',
            width: '100%',
            marginTop: 14,
            paddingBottom: 10,
            justifyContent: 'flex-start',
            borderRadius: 8,
            paddingHorizontal: 20,
          }}
        /> */}
      </View>
    </View>
  )
}
