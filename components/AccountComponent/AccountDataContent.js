import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { PermissionsAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { UserChangePicture } from '../../redux/Reducers/UserReducer'
import { UserLogout } from '../../redux/Reducers/UserReducer'
import { DeleteCocktail } from '../../redux/Reducers/CocktailReducer'
import { ChangeImageUser } from '../../redux/apiCalls'
import { LogoutOrder } from '../../redux/Reducers/DeleteOrderReducer'

export default function AccountDataContent({ navigation }) {
  const [Visible, setVisible] = useState(false)
  const User = useSelector((state) => state.user?.userContainer);
  const {img, firstname, lastname, _id} = User;
  
  const dispatch = useDispatch()
  return (
    <View>
      <UserDataContent
        UserImage={img}
        firstname={firstname}
        lastname={lastname}
        setVisible={setVisible}
      />
      {Visible && (
        <Modal
          visible={Visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setVisible(false)}
        >
          <ChangeSelection
            setVisible={setVisible}
            launchCamera={launchCamera}
            launchImageLibrary={launchImageLibrary}
            dispatch={dispatch}
            UserChangePicture={UserChangePicture}
            navigation={navigation}
            userID={_id}
          />
        </Modal>
      )}
    </View>
  )
}

const UserDataContent = (props) => {
    const deleteOrder = useSelector(
      (state) => state.deleteOrder.deleteOrderContainer
    )
    const cartOrder = useSelector((state)=> state.cart.cart)
    const orders = useSelector(state=>state.order.orderContainer);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 64,
      }}
    >
      <View>
        <TouchableOpacity onPress={() => props.setVisible(true)}>
          <Image
            source={{ uri: props.UserImage }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              borderWidth: 2,
              borderColor: '#3498DB',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 17,
            fontWeight: '600',
            alignSelf: 'center',
            marginTop: 16,
          }}
        >
          {props.firstname} {props.lastname}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: 26,
        }}
      >
        <View style={{ paddingHorizontal: 8 }}>
          <Text
            style={{ alignSelf: 'center', fontWeight: '500', fontSize: 17 }}
          >
            {cartOrder.length}
          </Text>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            cart
          </Text>
        </View>
        <View style={{ paddingHorizontal: 8 }}>
          <Text
            style={{ alignSelf: 'center', fontWeight: '500', fontSize: 17 }}
          >
            {orders.length}
          </Text>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            pending
          </Text>
        </View>
        <View style={{ paddingHorizontal: 8 }}>
          <Text
            style={{ alignSelf: 'center', fontWeight: '500', fontSize: 17 }}
          >
            0
          </Text>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Received
          </Text>
        </View>
        <View style={{ paddingHorizontal: 8 }}>
          <Text
            style={{ alignSelf: 'center', fontWeight: '500', fontSize: 17 }}
          >
            {deleteOrder.length}
          </Text>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Canceled
          </Text>
        </View>
      </View>
    </View>
  )
}

const ChangeSelection = (props) => {
  const { setVisible, ImagePicker, launchImageLibrary, launchCamera } = props

  const ImageCameraLaunch = async () => {
    try {
      const grantedcamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'Allow CocktailShop to take pictures and record video?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )

      if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
        var options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        }

        launchCamera(options, (res) => {

          if (res.didCancel) {
            console.log('User cancelled image picker')
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error)
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton)
          } else {
            console.log('response', JSON.stringify(res))
            ChangeImageUser(props.dispatch, {
              img: res.assets[0].uri
            },props.userID);
            setVisible(false)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ImageGalleryLaunch = async () => {
    try {
      const grantedstorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Gallery Permission',
          message:
            'Allow CocktailShop to access photos, media, and files on your device?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )

      if (grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
        var options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        }

        launchImageLibrary(options, (res) => {

          if (res.didCancel) {
            console.log('User cancelled image picker')
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error)
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton)
          } else {
            console.log('response', JSON.stringify(res))
             ChangeImageUser(
               props.dispatch,
               {
                 img: res.assets[0].uri,
               },
               props.userID
             )
            setVisible(false)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ChangeSelectionContent
        setVisible={setVisible}
        ImageGalleryLaunch={ImageGalleryLaunch}
        ImageCameraLaunch={ImageCameraLaunch}
        navigation={props.navigation}
        dispatch={props.dispatch}
      />
    </>
  )
}

const ChangeSelectionContent = (props) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: 200,
          backgroundColor: 'white',
          zIndex: 99,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'baseline',
            width: '100%',
            height: '100%',
          }}
        >
          <View
            style={{
              width: '100%',
              paddingHorizontal: 16,
              marginVertical: 4,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onPress={props.ImageCameraLaunch}
            >
              <Image
                source={require('../../assets/images/Camera.gif')}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text style={{ marginLeft: 16, fontSize: 17, fontWeight: '500' }}>
                Use Camera to Change
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 16,
              marginVertical: 4,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onPress={props.ImageGalleryLaunch}
            >
              <Image
                source={require('../../assets/images/SelectImage.gif')}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text style={{ marginLeft: 16, fontSize: 17, fontWeight: '500' }}>
                Select Image from Gallery to Change
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 16,
              marginVertical: 4,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onPress={() => {
                props.setVisible(false)
                props.navigation.navigate('ViewProfilePic')
              }}
            >
              <Image
                source={require('../../assets/images/Glass.gif')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#eee',
                }}
              />
              <Text style={{ marginLeft: 16, fontSize: 17, fontWeight: '500' }}>
                View Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 16,
              marginVertical: 4,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onPress={() => {
                props.dispatch(UserLogout());
                props.dispatch(DeleteCocktail());
                props.dispatch(LogoutOrder());
              }}
            >
              <Image
                source={require('../../assets/images/Logout.gif')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#eee',
                }}
              />
              <Text style={{ marginLeft: 16, fontSize: 17, fontWeight: '500' }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ position: 'absolute', top: 6, right: 16 }}>
          <TouchableOpacity onPress={() => props.setVisible(false)}>
            <Ionicons name="close" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
