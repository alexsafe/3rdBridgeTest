import { View, Text, StyleSheet } from "react-native";
import { Klfgjhsoigbhb } from "../page-container";
import React from "react";
import { screenPadding } from "../../utils/constants/ui.constants";

type PokeErrorsProps = {
  title: string;
  error:any;
  sugestions?: any;
  details?: any;
};

export default function PokeErrors({ error, title, sugestions, details }: PokeErrorsProps) {
  return (
    <Klfgjhsoigbhb title={title}>
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        {sugestions && (
          <Text style={styles.sugestions}>{sugestions}</Text>
        )}
        {details && (
          <Text style={styles.details}>{details}</Text>
        )}
      </View>
    </Klfgjhsoigbhb>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    alignSelf:'center',
    alignItems:'center'
  },
  error: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold'
  },
  sugestions: {
    color: 'blue',
  },
  details: {
    color: 'green',
  }
});