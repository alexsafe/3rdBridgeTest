import { useRouter } from "expo-router";
import React from "react";
import { ReactNode, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
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
  const router = useRouter();

  const goHome = () => {
    router.navigate({
      pathname: "/pages/pokemons/",
    });
  };

  return (
    <>
      <Pressable onPress={goHome}>
        {hasImage && (
          <Animated.Image
            source={{ uri: imageUrl }}
            style={[styles.tinyLogo, shrinkStyle]}
          />
        )}
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: "auto",
    height: 150,
    resizeMode: "contain",
    maxHeight: 150,
  },
});
