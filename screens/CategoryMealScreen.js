import React from "react";
import { StyleSheet, Text, View, Platform} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";

const CategoryMealScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const filteredMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  return filteredMeals.length === 0 ? (
    <View style={styles.noFavs}>
      <Text style={{ fontSize: 16, fontFamily: "open-sans" }}>
        There's nothing here...
      </Text>
      <Text style={{ fontSize: 12, fontFamily: "open-sans" }}>
        The content here doesn't match your applied filters.
      </Text>
    </View>
  ) : (
    <MealList meals={filteredMeals} navigation={props.navigation} />
  );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const currentCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );

  return {
    headerTitle: currentCategory.title,
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? currentCategory.color : "",
    },
    headerTintColor:
      Platform.OS === "android" ? "white" : currentCategory.color,
  };
};

const styles = StyleSheet.create({
  noFavs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
