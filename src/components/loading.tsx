import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default function Loading() {
  return (
    <View style={Styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../../assets/loading.gif")}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignSelf:"center",
  },
});
