import {
  DefaultError,
  useQueries,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Chain, EvolutionData, Species } from "../models";
import { PokemonService } from "../services";
import { Link } from "expo-router";
import { PokemonCard } from "./pokemon-card";
import {
  baseUrl,
  noOfRetries,
  pokemonEndpoint,
} from "../utils/constants/api.constants";
import { ApiErrorType } from "../utils/erorrs/api.errors";
import Loading from "./loading";
import { handleApiError } from "../utils/erorrs/error.handler.";
import ComponentError from "./errors/pokemon-sub-errors";
import { screenHeight } from "../utils/constants/ui.constants";

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
  } = useQuery<EvolutionData, ApiErrorType>({
    retry: (failureCount, error) => {
      if (error.status === 500 || failureCount < 3) {
        return true;
      }
      return false;
    },
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

    while (current && current.evolves_to.length) {
      currentPokeUrl !== current.species.url && urls.push(current.species.url);
      current = current.evolves_to[0];
    }
    currentPokeUrl !== current.species.url && urls.push(current.species.url);
    return urls;
  }, [evolutionData]);

  const speciesQueries = useQueries({
    queries: evolutionUrls.map<UseQueryOptions<Species[], ApiErrorType>>(
      (url) => ({
        queryKey: ["pokemonSpecies", url],
        queryFn: () => PokemonService.getPokemonSpecies(url),
      })
    ),
  });

  const isSpeciesLoading: boolean = speciesQueries.some(
    (query) => query.isLoading
  );
  const speciesError: ApiErrorType | null | undefined = speciesQueries.find(
    (query) => query.error
  )?.error;
  const speciesData: any = speciesQueries
    .map((query, index) => {
      const data = query.data;
      if (data) {
        return { ...data, url: `${baseUrl}${pokemonEndpoint}${data.id}/` }; // Construct the url property
      }
      return undefined;
    })
    .filter(Boolean);

  if (isSpeciesLoading) return <Loading />;
  if (speciesError) {
    const errorResponse = handleApiError(speciesError);
    return (
      <ComponentError
        title="Evolutions"
        error={errorResponse}
        details={speciesError.status.toString() || speciesError.message}
      />
    );
  }

  if (!evolutionData) {
    return <Text>No evolution data...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evolutions</Text>
      {speciesData.map((species: Species, index: number) => (
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
