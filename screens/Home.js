import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import BottomTabs from './BottomTabs'
import { Divider } from 'react-native-elements'
import RestaurantItems from '../components/Home/RestaurantItems'
import Searchbar from '../components/Home/Searchbar'
import HeaderTabs from '../components/Home/HeaderTabs'
import Categories from '../components/Home/Categories'
import { useDispatch, useSelector } from 'react-redux'
import { SetCocktailContainer } from '../redux/Reducers/CocktailReducer'
import { getCocktailOrders, getCocktailsCart, GetDeleteCocktails } from '../redux/apiCalls'

export default function Home({ navigation }) {
  const username = useSelector(state=>state.user.userContainer.username)
  const [restaurantData, setrestaurantData] = useState([])
  const [Search, setSearch] = useState('a')
  const [ActiveTab, setActiveTab] = useState('Alcoholic')
  const [DefaultText, setDefaultText] = useState('Home')
  const getUrl = 'https://thecocktaildb.com/api/json/v1/1/search.php?s='
  const dispatch = useDispatch()
  const [refreshing, setrefreshing] = useState(false);

  const getRestaurantYelp = async () => {
    try {
      const response = await fetch(`${getUrl}${Search}`)
      const data = await response.json()
      const { drinks } = data
      setrestaurantData(
        drinks.filter((items) => items.strAlcoholic === ActiveTab)
        )
      dispatch(SetCocktailContainer(drinks))
    } catch (err) {
      setrestaurantData(null)
    }
  }

  useEffect(()=>{
    const refreshStart = setInterval(()=>{
      setrefreshing(false);
    },2000)
    return ()=> clearInterval(refreshStart)
  },[refreshing])


  useEffect(() => {
    getRestaurantYelp()
  }, [Search, ActiveTab])

  useEffect(() => {
    setDefaultText('Home')
    getCocktailsCart(dispatch, username);
    getCocktailOrders(dispatch, username);
    GetDeleteCocktails(dispatch, username);
  }, [navigation])

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#eee',
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          padding: 1,
        }}
      >
        <HeaderTabs ActiveTab={ActiveTab} setActiveTab={setActiveTab} />
        <Searchbar setSearch={setSearch} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getRestaurantYelp}
          />
        }
      >
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} DefaultText={DefaultText} />
    </SafeAreaView>
  )
}
