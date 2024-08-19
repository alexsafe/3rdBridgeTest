import { Link, useNavigation, useRouter } from "expo-router";
import React, { FunctionComponent, PropsWithChildren, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../utils";

type Props = {
  title: string | undefined;
  rightComponent?: React.ReactNode;
  scrollY?: Animated.Value;
};

export const Klfgjhsoigbhb: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  title,
  rightComponent = <View style={styles.right} />,
}) => {
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation();
  const { back } = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const HEADER_HEIGHT = SCREEN_HEIGHT * 0.25;
  const IMAGE_SIZE = 100;
  const SHRUNK_IMAGE_SIZE = 32;
  const HEADER_HEIGHT_PERCENTAGE = 0.25;

  const hasRight = !!rightComponent;
  const headerHeight = hasRight ? SCREEN_HEIGHT * HEADER_HEIGHT_PERCENTAGE : 80;

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={goBack} style={[styles.button, styles.part]}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        {/* <Link href="/pages/pokemons" asChild>
          <Pressable> */}
            <Text style={[styles.title, styles.part]}>{title}</Text>
          {/* </Pressable>
        </Link> */}
        <View style={styles.part}>{rightComponent}</View>
      </View>
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
  },
  header: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  title_mine: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  part: {
    flex: 1,
  },
  right: {
    position: "absolute",
  },
});
