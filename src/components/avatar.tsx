import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface AvatarProps {
  uri: string;
}

export const Avatar: React.FC<AvatarProps> = ({ uri }) => {
  return <Image source={{ uri }} style={styles.avatar} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 'auto', // Initial size
    height: 100,
    borderRadius: 50,
  },
});
