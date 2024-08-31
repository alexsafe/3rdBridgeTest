import { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, Extrapolation, interpolate, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { initialHeader, screenPadding, duration, headerHeight, avatarCollapsedResolution, avatarInitialResolution, imageCollapsedX } from '../utils/constants/ui.constants';

export const useAnimatedScroll = () => {
    const scrollY = useSharedValue<number>(0);

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
      },
    });


    const animatedScrollViewStyle = useAnimatedStyle(() => {
        return {
          paddingTop: withTiming(
            interpolate(
              scrollY.value,
              [0, 70],
              [0, initialHeader + screenPadding],
              Extrapolation.CLAMP
            ),
            {
              duration,
            }
          ),
        };
      });
    
      const animatedHeaderStyle = useAnimatedStyle(() => {
        return {
          height: withTiming(
            interpolate(
              scrollY.value,
              [0, 100],
              [headerHeight, initialHeader],
              Extrapolation.CLAMP
            ),
            {
              duration,
            }
          ),
        };
      });
      const animatedAvatarStyle = useAnimatedStyle(() => {
        return {
          width: withTiming(
            interpolate(
              scrollY.value,
              [0, 70],
              [avatarInitialResolution, avatarCollapsedResolution],
              Extrapolation.CLAMP
            ),
            {
              duration,
            }
          ),
          height: withTiming(
            interpolate(
              scrollY.value,
              [0, 70],
              [avatarInitialResolution, avatarCollapsedResolution],
              Extrapolation.CLAMP
            ),
            {
              duration,
            }
          ),
          transform: [
            {
              translateY: withTiming(
                interpolate(scrollY.value, [0, 100], [0, -50], Extrapolation.CLAMP),
                { duration }
              ),
            },
            {
              translateX: withTiming(
                interpolate(
                  scrollY.value,
                  [0, 100],
                  [0, imageCollapsedX],
                  Extrapolation.CLAMP
                ),
                { duration }
              ),
            },
          ],
        };
      });

  useEffect(() => {
    // Any additional side effects can be handled here if needed
  }, [scrollY]);

  return { scrollHandler, animatedScrollViewStyle, animatedHeaderStyle, animatedAvatarStyle, scrollY };
};
