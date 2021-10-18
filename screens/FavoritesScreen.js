import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";
import CustomHeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FavoritesScreen = (props) => {
  const favorites = useSelector((state) => state.meals.favouriteMeals);
  return favorites.length === 0 ? (
    <View style={styles.noFavs}>
      <Text style={{fontSize: 16, fontFamily: 'open-sans'}}>There's nothing here ...</Text>
    </View>
  ) : (
    <MealList meals={favorites} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = (navigationData) => {
  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navigationData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerTitle: "Favourite Meals",
  };
};

const styles = StyleSheet.create({
  noFavs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
