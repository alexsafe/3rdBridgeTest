import React from "react";
import { ReactNode, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

interface PokeImageProps {
  imageUrl?: string;
}

export default function PokeImage({ imageUrl }: PokeImageProps): ReactNode {
  const hasImage = !!imageUrl;

  return (
    <View >
      {hasImage && (
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.tinyLogo,
            {
              // width: imageSize,
              // height: imageSize,
              // top: imageTopPosition,
              // left: imageLeftPosition,
              // // transform:  [{ translateY: -imageTransform }, { translateX: imageTranslateX }],
              // right: imageRightPosition,
            },
          ]}
          resizeMode="contain"
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    position: "absolute",
  },
  image_mine: {
    position: "absolute",
    top: "50%",
    left: "50%",
    // marginLeft: -100 / 2, // To center the image horizontally
  },
  tinyLogo: {
    width: 'auto',
    height: 100,
  },
});
// TODO add the image at the propper place per the README file
// <View>
//   <Image
//     source={{ uri: "https://via.placeholder.com/150" }} // Replace with your image URL
//     style={[
//       styles.tinyLogo,
//       {
//         //   width: imageSize,
//         //   height: imageSize,
//         //   transform: [{ translateY: imageTransform }, { translateX: imageTranslateX }],
//       },
//     ]}
//     resizeMode="contain"
//   />
// </View>
