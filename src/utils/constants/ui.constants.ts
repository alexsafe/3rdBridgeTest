import { Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
export const screenHeight = SCREEN_HEIGHT;
export const screenWidth = SCREEN_WIDTH;
export const initialHeader = 45;
export const headerHeight = SCREEN_HEIGHT * 0.25 + initialHeader;
export const avatarCollapsedResolution = 32;
export const avatarInitialResolution = 200;
export const screenPadding = 16;
export const imageCollapsedX =
  SCREEN_WIDTH / 2 + avatarInitialResolution / 2 - 2 * screenPadding;

export const centerImage =
  SCREEN_WIDTH / 2 - avatarInitialResolution / 2 + 2 * screenPadding;

export const duration = 50;
