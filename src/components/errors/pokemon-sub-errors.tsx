import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { screenPadding } from "../../utils/constants/ui.constants";

type PokeErrorsProps = {
  title: string;
  error: any;
  sugestions?: any;
  details?: any;
};

export default function ComponentError({
  error,
  title,
  details,
}: PokeErrorsProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.error}>{title} error</Text>
        {error && <Text style={styles.sugestions}>{error}</Text>}
        {details && <Text style={styles.details}>{details}</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: screenPadding,
    alignSelf: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
  sugestions: {
    color: "blue",
  },
  details: {
    color: "green",
  },
});
