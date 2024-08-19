import React from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DefaultError, useQuery } from "@tanstack/react-query";
import { PokemonInfo, Species } from "../../src/models";
import { PokemonService } from "../../src/services";
import { Klfgjhsoigbhb, PokemonCard } from "../../src/components";
import EvolutionCard from "../../src/components/evolutions-card";
import PokemonType from "../../src/components/pokemon-types";
import PokeImage from "../../src/components/pokemon-image";
import PokeErrors from "../../src/components/pokemon-errors";

export default function PokemonDetails() {
  const { url } = useLocalSearchParams() as { url: string };

  const {
    data: pokeDetails,
    isLoading: isPokeLoading,
    error: pokeError,
    // refetch: refetchPokeDetails,
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
    // refetch: refetchPokeSpecies,
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
    <Klfgjhsoigbhb
      title={pokeDetails?.name}
      rightComponent={
        <PokeImage imageUrl={pokeDetails?.sprites?.front_default} />
      }
    >
      <ScrollView contentContainerStyle={styles.container}>
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
      </ScrollView>
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
});
