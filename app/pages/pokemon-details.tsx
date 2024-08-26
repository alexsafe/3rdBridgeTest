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
import PokeErrors from "../../src/components/errors/pokemon-errors";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
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
import { noOfRetries } from "../../src/utils/constants/api.constants";
import { handleApiError } from "../../src/utils/erorrs/error.handler.";
import { ApiErrorType } from "../../src/utils/erorrs/api.errors";
import Loading from "../../src/components/loading";
import ComponentError from "../../src/components/errors/pokemon-sub-errors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PokemonDetails() {
  const { url } = useLocalSearchParams() as { url: string };
  const insets =  useSafeAreaInsets();
  // quick fix to ignore scroll for pokemons with less details like weedle
  const [movesHeight, setMovesHeight] = useState(0);
  const [extraPadding, setExtraPadding] = useState(0);
  useEffect(() => {
    const minHeight = screenHeight / 3 + insets.top;
    if (movesHeight > minHeight) {
      setExtraPadding(screenHeight * 0.25);
    } else {
      setExtraPadding(0);
    }
  }, [movesHeight]);

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

  const {
    data: pokeDetails,
    isLoading: isPokeLoading,
    error: pokeError,
  } = useQuery<PokemonInfo, ApiErrorType, PokemonInfo>({
    queryKey: ["pokemonDetails", url],
    queryFn: () => PokemonService.getPokemonDetails(url),
    retry: (failureCount, error) => {
      if (error.status === 500 || failureCount < 3) {
        return true;
      }
      return false;
    },
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

  let currentSpeciesUrl = pokeDetails?.species.url!;

  const {
    data: pokeSpecies,
    isLoading: isSpeciesLoading,
    error: errorSpecies,
  } = useQuery<Species, ApiErrorType, Species>({
    queryKey: ["pokemonSpecies", currentSpeciesUrl],
    queryFn: () => PokemonService.getPokemonSpecies(currentSpeciesUrl),
    enabled: !!pokeDetails,
    retry: (failureCount, error) => {
      if (error.status === 500 || failureCount < 3) {
        return true;
      }
      return false;
    },
    select: (data) => data,
  });

  if (isPokeLoading) return <Loading />;
  if (pokeError) {
    const errorResponse = handleApiError(pokeError);
    return (
      <PokeErrors
        title="Pokemon error"
        error={errorResponse}
        details={pokeError.status.toString() || pokeError.message}
      />
    );
  }
  if (errorSpecies) {
    const errorResponse = handleApiError(errorSpecies);
    <ComponentError
      title="Species error"
      error={errorResponse}
      details={errorSpecies.status.toString() || errorSpecies.message}
    />;
  }
  const handleMovesLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setMovesHeight(height);
  };

  return (
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
        contentContainerStyle={[
          {
            marginTop: screenPadding,
            paddingBottom: extraPadding,
            paddingHorizontal: screenPadding,
          },
        ]}
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
        <View onLayout={handleMovesLayout}>
          {pokeDetails?.moves.slice(0, 5).map((move: any, index: number) => (
            <View key={index} style={styles.contentContainerStyle}>
              <PokemonCard item={move.move} isFirst={true} />
            </View>
          ))}
        </View>
        <EvolutionCard
          evolutionChainUrl={pokeSpecies?.evolution_chain.url!}
          currentPokeUrl={currentSpeciesUrl!}
        />
      </Animated.ScrollView>
    </Klfgjhsoigbhb>
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
    paddingTop: 40,
    alignSelf: "center",
  },
});
