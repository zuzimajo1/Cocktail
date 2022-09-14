import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LoadingGif from "../../assets/images/Loading.gif";
import { useDispatch } from 'react-redux'
import { RemoveCartItem, AddQuantityCocktail, ChangeCocktailCheck } from '../../redux/Reducers/CartReducer'
import {
  UpdateCocktail,
  UpdateCocktailCheck,
  DeleteCocktail,
} from '../../redux/apiCalls'
export default function CartItems() {
   const cart = useSelector((state) => state.cart.cart)
   const dispatch = useDispatch()
   const [LoadingScreen, setLoadingScreen] = useState(false)

   useEffect(() => {
   const loadinginterval =  setInterval(() => {
       setLoadingScreen(false)
     }, 50)
     return ()=> clearInterval(loadinginterval);
   }, [LoadingScreen])
   
 if (LoadingScreen) {
   return (
     <View
       style={{
         width: '100%',
         height: 500,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: "#eee",
   
       }}
     >
       <Image source={LoadingGif} style={{ width: 150, height: 150}}></Image>
     </View>
   )
 }
 if (cart.length === 0) {
   return (
     <View
       style={{
         width: '100%',
         height: 450,
         justifyContent: 'center',
         alignItems: 'center',
       }}
     >
       <Text
         style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}
       >
         Empty Cart
       </Text>
     </View>
   )
 }

 return (
   <View
     style={{
       width: '100%',
       height: '100%',
       paddingHorizontal: 15,
     }}
   >
     {cart.map((items, index) => (
       <CartItem
         items={items}
         key={index}
         dispatch={dispatch}
         setLoadingScreen={setLoadingScreen}
       />
     ))}
   </View>
 )
}


const CartItem = (props) => {
  const [Checkbox, setCheckbox] = useState(props.items.CocktailisCheck)
  const [QuantityCocktail, setQuantityCocktail] = useState(props.items.quantity)
  const [QuantityCondition, setQuantityCondition] = useState(null)
  const [Validator, setValidator] = useState(false)

  const HandleQuantityCocktail = (condition) => {
    if (condition === 'inc') {
      setQuantityCocktail(QuantityCocktail + 1)
      setQuantityCondition('increase')
    } else if (condition === 'dec') {
      setQuantityCocktail(QuantityCocktail - 1)
      setQuantityCondition('decrease')
    }
  }

  useEffect(() => {
    if (QuantityCocktail >= 1) {
      Validator && (UpdateCocktail(
        props.dispatch,
        {
          quantity: QuantityCocktail,
          subTotal: props.items.cocktailPrice * QuantityCocktail,
        },
        props.items._id,
        QuantityCondition,
        props.setLoadingScreen
      ))

    } else if (QuantityCocktail < 1) {
     Validator && (DeleteCocktail(
        props.dispatch,
        props.items._id,
        Checkbox,
        props.setLoadingScreen
      ))
    }
  }, [QuantityCocktail, QuantityCondition])

  useEffect(() => {
    Validator && UpdateCocktailCheck(props.dispatch, props.items._id, Checkbox)

  }, [Checkbox])

  useEffect(() => {
    const CheckBoxTimeInterval = setInterval(() => {
      setValidator(false)
    }, 50)
    return () => clearInterval(CheckBoxTimeInterval)
  }, [Validator])

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 120,
          backgroundColor: '#eee',
          marginVertical: 10,
          borderColor: '#D2E2E7',
          borderBottomWidth: 1,
          borderTopWidth: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BouncyCheckbox
            size={20}
            fillColor="#455A49"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: '#455A49', borderRadius: 4 }}
            onPress={() => {
              setValidator(true)
              setCheckbox(!Checkbox)
            }}
            isChecked={Checkbox}
          />
        </View>
        <View
          style={{
            flex: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              height: '100%',
              flex: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontWeight: '700',
                  fontSize: 17,
                  paddingBottom: 6,
                }}
              >
                {props.items.cocktailTitle}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 15,
                  fontFamily: 'Helvetica Neue Medium Extended',
                }}
              >
                {props.items.cocktailCategory}
              </Text>
              <Text>₱{props.items.cocktailPrice}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 2,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    backgroundColor: '#D6CAEC',
                  }}
                  onPress={() => {
                    HandleQuantityCocktail('dec')
                    setValidator(true);
                    
                  }}
                >
                  <Ionicons name="remove-outline" size={20} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 4,
                  }}
                >
                  {QuantityCocktail}
                </Text>
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#D6CAEC',
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    HandleQuantityCocktail('inc')
                        setValidator(true)
                  } 
                }
                >
                  <Ionicons name="add-outline" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'baseline',
                height: '100%',
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: '500' }}>
                ₱{props.items.subTotal}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={{ uri: props.items.cocktailImage}}
              style={{ width: 120, height: 120, borderRadius: 4 }}
            />
          </View>
        </View>
      </View>
    </>
  )
}

