import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CocktailSearchBar from '../components/SearchComponent/CocktailSearchBar'
import CocktailSearches from '../components/SearchComponent/CocktailSearches'
import { Divider } from 'react-native-elements'
import BottomTabs from './BottomTabs'
import { FlatGrid } from 'react-native-super-grid'
import { useDispatch } from "react-redux";
import { SetCocktailContainer } from '../redux/Reducers/CocktailReducer'

const Search = ({ navigation }) => {
  const [DefaultText, setDefaultText] = useState('Search')
  const [SearchComponentContainer, setSearchComponentContainer] = useState([])
  const [SearchComponentCocktail, setSearchComponentCocktail] = useState('a')
  const [SearchComponentValidator, setSearchComponentValidator] =
    useState(false)
  const getUrl = 'https://thecocktaildb.com/api/json/v1/1/search.php?s='
    const dispatch = useDispatch()

  const getSearchComponent = async () => {
    try {
      const getSearch = await fetch(`${getUrl}${SearchComponentCocktail}`)
      const res = await getSearch.json()
      const { drinks } = res
      dispatch(SetCocktailContainer(drinks))
      setSearchComponentContainer(drinks)
    } catch (err) {
      setSearchComponentContainer(null)
    }
  }

  useEffect(() => {
  SearchComponentValidator &&  getSearchComponent();
  }, [SearchComponentCocktail])

  useEffect(() => {
    setDefaultText('Search')
  }, [navigation])

  return (
    <SafeAreaView style={{ backgroundColor: '#eee', flex: 1, height: '100%' }}>
     
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: "100%",
          
        }}
      >
        <CocktailSearchBar
          setSearchComponentCocktail={setSearchComponentCocktail}
          setSearchComponentValidator={setSearchComponentValidator}
        />

      <CocktailSearches
        navigation={navigation}
        SearchComponentContainer={SearchComponentContainer}
        />
        </View>
      <Divider width={1} />
      <BottomTabs navigation={navigation} DefaultText={DefaultText} />


    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})
