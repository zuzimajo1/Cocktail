import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCartItem } from '../../redux/Reducers/CartReducer'
import { AddCartUser } from '../../redux/apiCalls'

export default function AddCart({route}) {
      const username = useSelector((state) => state.user?.userContainer.username);
      const cartItems = useSelector(state=>state.cart.cart);

     const {
       cocktailImage,
       cocktailTitle,
       cocktailInfo,
       cocktailGlass,
       cocktailCategory,
       cocktailInstructions,
       cocktailIngredients1,
       cocktailIngredients2,
       cocktailIngredients3,
       cocktailIngredients4,
       cocktailIngredients5,
       cocktailPrice,
     } = route.params

     const itemID = new Date().getTime()
     const dispatch = useDispatch()
     const [Additem, setAdditem] = useState(false)


     const AddCartButton = () => {
       setAdditem(true)
      //  dispatch(
      //    AddCartItem({
      //      itemID,
      //      ...route.params,
      //      quantity: 1,
      //      subTotal: route.params.cocktailPrice * 1,
      //      CocktailisCheck: false,
      //    })
      //  )

       AddCartUser(
         dispatch,
         {
           cartID: itemID,
           cocktailID: cocktailPrice,
           username,
           cocktailImage,
           cocktailTitle,
           cocktailInfo,
           cocktailGlass,
           cocktailCategory,
           cocktailIngredients1,
           cocktailIngredients2,
           cocktailIngredients3,
           cocktailIngredients4,
           cocktailIngredients5,
           cocktailPrice,
           quantity: 1,
           subTotal: cocktailPrice * 1,
           CocktailisCheck: false,
         },
         cocktailPrice,
         cartItems
       )
     }

     useEffect(() => {
       const buttoninterval = setInterval(() => {
         setAdditem(false)
       }, 1500)
       return () => clearInterval(buttoninterval)
     }, [Additem])


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        zIndex: 99,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Additem ? '#455A49' : 'black',
            alignItems: 'center',
            padding: 8,
            borderRadius: 30,
            width: 220,
            position: 'relative',
          }}
          disabled={Additem ? true : false}
          onPress={AddCartButton}
        >
          <Text style={{ color: 'white', fontSize: 17 }}>
            {Additem ? 'Added To Cart' : 'Add Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}