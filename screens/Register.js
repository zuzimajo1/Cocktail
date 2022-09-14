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
import { PublicRequest } from '../RequestMethod'
import { LoginUserSuccess } from '../redux/Reducers/UserReducer'
import { useDispatch } from 'react-redux'
export default function Register({ navigation }) {
  const [Screen, setScreen] = useState('Register')
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
          <RegisterForm />
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
      <Pressable onPress={() => props.navigation.navigate('Login')}>
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
      </Pressable>

      <View
        style={{
          backgroundColor: props.Screen === 'Register' ? '#353335' : 'black',
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
            color: props.Screen === 'Register' ? 'white' : '#8D868E',
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          register
        </Text>
      </View>
    </View>
  )
}

const RegisterForm = () => {
  const [ShowPassword, setShowPassword] = useState(false)
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [ConfirmPassword, setConfirmPassword] = useState(null)
  const dispatch = useDispatch();

  const HandleButtonRegister = async () => {
    if (firstname && lastname && username && password && ConfirmPassword) {
      if (password === ConfirmPassword) {
        try {
          const res = await PublicRequest.post('auth/register', {
            firstname,
            lastname,
            username,
            password,
            img: 'data:image/jpeg;base64,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',
          })
          dispatch(LoginUserSuccess(res.data));
        } catch (error) {
            console.log(error);
        }
      } else {
        console.log('Password does not match')
      }
    } else {
      console.log("Please don't omit any details")
    }
  }

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 36,
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
          Firstname
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
          onChangeText={setFirstname}
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
          Lastname
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
          onChangeText={setLastname}
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
        <Text
          style={{
            textTransform: 'uppercase',
            color: 'white',
            fontSize: 12,
            marginTop: 12,
            paddingBottom: 6,
          }}
        >
          Confirm Password
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
          onChangeText={setConfirmPassword}
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
          title="Register"
          buttonStyle={{
            backgroundColor: '#6283FD',
            width: 112,
            marginTop: 14,
            paddingBottom: 10,
            alignSelf: 'center',
            borderRadius: 4,
          }}
          onPress={HandleButtonRegister}
        />
      </View>
    </View>
  )
}
