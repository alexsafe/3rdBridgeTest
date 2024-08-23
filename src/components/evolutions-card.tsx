import { DefaultError, useQueries, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Species } from "../models";
import { PokemonService } from "../services";
import { Link } from "expo-router";
import { PokemonCard } from "./pokemon-card";
import { baseUrl, pokemonEndpoint } from "../utils/constants/api.constants";

type EvolutionCardProps = {
  evolutionChainUrl: string;
  currentPokeUrl: string;
};

export default function EvolutionCard({
  evolutionChainUrl,
  currentPokeUrl,
}: EvolutionCardProps) {
  const {
    data: evolutionData,
    isLoading: isEvolutionsLoading,
    error: evolutionsError,
  } = useQuery<any, DefaultError>({
    queryKey: ["evolutionChain", evolutionChainUrl],
    queryFn: () => PokemonService.getPokemonSpeciesEvolution(evolutionChainUrl),
    select: (data) => data,
  });
  const evolutionUrls = useMemo(() => {
    if (!evolutionData || !evolutionData.chain) {
      return [];
    }
    const urls: string[] = [];
    let current = evolutionData.chain;
    // console.log(evolutionData?.chain);

    while (current && current.evolves_to.length) {
      currentPokeUrl !== current.species.url && urls.push(current.species.url);
      current = current.evolves_to[0];
    }
    currentPokeUrl !== current.species.url && urls.push(current.species.url);
    return urls;
  }, [evolutionData]);

  const speciesQueries = useQueries({
    queries: evolutionUrls.map((url) => ({
      queryKey: ["pokemonSpecies", url],
      queryFn: () => PokemonService.getPokemonSpecies(url),
    })),
  });

  const isSpeciesLoading: boolean = speciesQueries.some(
    (query) => query.isLoading
  );
  const speciesError: Error | null | undefined = speciesQueries.find(
    (query) => query.error
  )?.error;
  const speciesData: Species[] = speciesQueries
    .map((query, index) => {
      const data = query.data;
      if (data) {
        return { ...data, url: `${baseUrl}${pokemonEndpoint}${data.id}/` }; // Construct the url property
      }
      return undefined;
    })
    .filter(Boolean);

  if (!evolutionData) {
    return <Text>No evolution data...</Text>;
  }

  //TODO handle loading and errors

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evolutions</Text>
      {speciesData.map((species, index) => (
        <View key={index}>
          <Link
            push
            href={{
              pathname: "/pages/pokemon-details",
              params: { url: species.url },
            }}
            asChild
          >
            <Pressable>
              <PokemonCard item={species} isFirst={index === 0} />
            </Pressable>
          </Link>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  contentContainerStyle: {
    paddingBottom: 10,
  },
});
