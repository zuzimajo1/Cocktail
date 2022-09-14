import {
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function BottomTabs({ navigation, DefaultText }) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-between",
        width: "100%",
        zIndex: 99,
        backgroundColor: "white",
      }}
    >
      <Icon
        navigation={navigation}
        iconName={DefaultText === "Home" ? "home" : "home-outline"}
        text="Home"
        navigate="Home"
      />
      <Icon
        navigation={navigation}
        iconName={DefaultText === "Search" ? "search" : "search-outline"}
        text="Search"
        navigate="SearchTab"
      />
      <Icon
        navigation={navigation}
        iconName={DefaultText === "Cart" ? "cart" : "cart-outline"}
        text="Cart"
        navigate="CartTab"
      />
      <Icon
        navigation={navigation}
        iconName={DefaultText === "Order" ? "clipboard" : "clipboard-outline"}
        text="Order"
        navigate="OrderTab"
      />
      <Icon
        navigation={navigation}
        iconName={DefaultText === "Account" ? "person" : "person-outline"}
        text="Account"
        navigate="Account"
      />
    </View>
  );
}

const Icon = (props) => (
  <>
    <TouchableOpacity onPress={() => props.navigation.navigate(props.navigate)}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 58,
        }}
      >
        <Ionicons size={25} name={props.iconName} style={{ marginBottom: 3, color: "black" }} />
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  </>
)
