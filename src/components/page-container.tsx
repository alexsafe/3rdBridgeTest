import { Link, useNavigation, useRouter } from "expo-router";
import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../utils";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { initialHeader } from "../utils/constants/ui.constants";

type Props = {
  title: string | undefined;
  rightComponent?: React.ReactNode;
  animatedStyle?: any;
};

export const Klfgjhsoigbhb: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  title,
  animatedStyle,
  rightComponent = <View style={styles.right} />,
}) => {
  const insets = useSafeAreaInsets();
  const { back } = useRouter();
  return (
    <>
      <Animated.View
        style={[styles.header, { paddingTop: insets.top }, animatedStyle]}
      >
        <Pressable onPress={back} style={[styles.button, styles.part]}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, styles.part]}>{title}</Text>
        <View style={[styles.part]}>{rightComponent}</View>
      </Animated.View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 16,
    alignSelf: "baseline",
  },
  header: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    flex: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "baseline",
    textTransform: "capitalize",
  },
  part: {
    flex: 1,
  },
  right: {
    position: "absolute",
  },
});
