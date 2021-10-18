import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { toggleFavourite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMeal = availableMeals.find((meal) => meal.id === mealId);
  const isInFavouriteMeals = useSelector((state) =>
    state.meals.favouriteMeals.some((meal) => meal.id === mealId)
  );

  const dispatch = useDispatch();
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFavourite: toggleFavouriteHandler });
  }, [currentMeal]);

  useEffect(() => {
    props.navigation.setParams({ isFavourtie: isInFavouriteMeals });
  }, [isInFavouriteMeals]);

  return (
    <ScrollView>
      <Image source={{ uri: currentMeal.imageUrl }} style={styles.image} />
      <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
        <Text style={styles.text}>{currentMeal.duration} m</Text>
        <Text style={styles.text}>{currentMeal.complexity.toUpperCase()}</Text>
        <Text style={styles.text}>
          {currentMeal.affordability.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {currentMeal.ingredients.map((ingredient) => {
        return <ListItem key={ingredient}>{ingredient}</ListItem>;
      })}
      <Text style={styles.title}>Steps</Text>
      {currentMeal.steps.map((step) => {
        return <ListItem key={step}>{step}</ListItem>;
      })}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const isFav = navigationData.navigation.getParam("isFavourtie");
  return {
    headerTitle: mealTitle,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Favorite"
            iconName={isFav ? "ios-star" : "ios-star-outline"}
            onPress={() => {
              navigationData.navigation.getParam("toggleFavourite")();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mealRow: {
    flexDirection: "row",
    backgroundColor: Colors.accent,
  },
  mealDetail: {
    height: 25,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans",
    color: "white",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 2,
  },
  listItemText: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
});

export default MealDetailScreen;
