import React from "react";
import { ReactNode, useRef } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

interface PokeImageProps {
  imageUrl?: string;
  shrinkStyle?: any;
}

export default function PokeImage({
  imageUrl,
  shrinkStyle,
}: PokeImageProps): ReactNode {
  const hasImage = !!imageUrl;

  return (
    <>
      {hasImage && (
        <Animated.Image
          source={{ uri: imageUrl }}
          style={[
            styles.tinyLogo,
            shrinkStyle,
          ]}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: 'auto',
    height: 150,
    resizeMode: "contain",
    maxHeight: 150,
  },
});