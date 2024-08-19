import { View, Text } from "react-native";
import { Klfgjhsoigbhb } from "./page-container";
import React from "react";

type PokeErrorsProps = {
  error: string;
  title: string;
};

export default function PokeErrors({ error, title }: PokeErrorsProps) {
  return (
    <Klfgjhsoigbhb title={title}>
      <View>
        <Text>{error}</Text>
      </View>
    </Klfgjhsoigbhb>
  );
}
