import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgimage}
            >
              <Text style={styles.title}>{props.title}</Text>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <Text style={styles.text}>{props.duration} m</Text>
            <Text style={styles.text}>{props.complexity.toUpperCase()}</Text>
            <Text style={styles.text}>{props.affordability.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    backgroundColor: "#E5E5E5",
    width: "100%",
    marginVertical: 10,
    borderRadius: 7,
    overflow:'hidden'
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    height: '15%',
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: 'center'
  },
  bgimage: {
    width: "100%",
    height: "100%",
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal:15,
    fontSize: 20,
    textAlign:'center'
  },
  text: {
    fontFamily: 'open-sans'
  }
});

export default MealItem;
