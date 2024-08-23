import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, StyleSheet, ScrollView, View, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DefaultError, useQuery } from "@tanstack/react-query";
import { PokemonInfo, Species } from "../../src/models";
import { PokemonService } from "../../src/services";
import { Klfgjhsoigbhb, PokemonCard } from "../../src/components";
import EvolutionCard from "../../src/components/evolutions-card";
import PokemonType from "../../src/components/pokemon-types";
import PokeImage from "../../src/components/pokemon-image";
import PokeErrors from "../../src/components/pokemon-errors";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  useAnimatedProps,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../../src/components/avatar";
import {
  headerHeight,
  initialHeader,
  duration,
  avatarInitialResolution,
  avatarCollapsedResolution,
  imageCollapsedX,
  screenPadding,
  centerImage,
  screenHeight,
} from "../../src/utils/constants/ui.constants";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function PokemonDetails() {
  const { url } = useLocalSearchParams() as { url: string };

  const scrollY = useSharedValue<number>(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumEnd: (e) => {
      console.log("end momentl");
    },
    onEndDrag: (e) => {
      console.log("enddrag");
    },
  });

  const insets = useSafeAreaInsets();
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
      // marginBottom: withTiming(
      //   interpolate(
      //     scrollY.value,
      //     [0, 100],
      //     [0, -initialHeader],
      //     Extrapolation.CLAMP
      //   ),
      //   {
      //     duration,
      //   }
      // ),
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

  const {
    data: pokeDetails,
    isLoading: isPokeLoading,
    error: pokeError,
  } = useQuery<PokemonInfo, DefaultError, PokemonInfo>({
    queryKey: ["pokemonDetails", url],
    queryFn: () => PokemonService.getPokemonDetails(url),
    retry: 4,
    select: (data) => ({
      species: data?.species,
      sprites: data?.sprites,
      moves: data?.moves,
      types: data?.types,
      name: data?.name,
      id: data?.id,
      url: data?.url,
    }),
  });
  // if (isPokeLoading) return <Text>Loading...</Text>;
  // if (pokeError) return <Text>Error loading Pokemon details</Text>;

  let currentSpeciesUrl = pokeDetails?.species.url!;

  const {
    data: pokeSpecies,
    isLoading: isSpeciesLoading,
    error: errorSpecies,
  } = useQuery<Species, DefaultError, Species>({
    queryKey: ["pokemonSpecies", currentSpeciesUrl],
    queryFn: () => PokemonService.getPokemonSpecies(currentSpeciesUrl),
    enabled: !!pokeDetails,
    select: (data) => data,
  });

  if (isSpeciesLoading) return <Text>Loading...</Text>;

  // A possible way of error handling
  if (pokeDetails === undefined) {
    return <PokeErrors title="undefined" error="Poke not defined" />;
  }
  return (
    <Animated.View style={[{ flex: 1 }]}>
      <Klfgjhsoigbhb
        animatedStyle={animatedHeaderStyle}
        title={pokeDetails?.name}
        rightComponent={
          <Animated.View style={[styles.image, { right: centerImage }]}>
            <PokeImage
              imageUrl={pokeDetails?.sprites?.front_default}
              shrinkStyle={animatedAvatarStyle}
            />
          </Animated.View>
        }
      >
        <Animated.ScrollView
          contentContainerStyle={{
            marginTop: screenPadding,
            paddingBottom: screenHeight * 0.25,
            paddingHorizontal: screenPadding,
          }}
          style={[animatedScrollViewStyle]}
          onScroll={scrollHandler}
        >
          <Text>
            {pokeDetails?.types.map((type: any, index: number) => (
              <View key={index}>
                <PokemonType typeUrl={type.type.url} />
              </View>
            ))}
          </Text>
          <Text style={styles.title}>First 5 Moves</Text>
          {pokeDetails?.moves.slice(0, 5).map((move: any, index: number) => (
            <View key={index} style={styles.contentContainerStyle}>
              <PokemonCard item={move.move} isFirst={true} />
            </View>
          ))}
          <EvolutionCard
            evolutionChainUrl={pokeSpecies?.evolution_chain.url!}
            currentPokeUrl={currentSpeciesUrl!}
          />
        </Animated.ScrollView>
      </Klfgjhsoigbhb>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  contentContainerStyle: {
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  move: {
    fontSize: 16,
    marginVertical: 5,
  },
  image: {
    // backgroundColor: 'red',
    paddingTop: 40,
    alignSelf: "center",
  },
});
