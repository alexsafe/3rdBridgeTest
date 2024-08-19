import { DefaultError, useQuery } from "@tanstack/react-query";
import { View, Text, StyleSheet, Image } from "react-native";
import { PokemonService } from "../services";

type PokemonTypeProps = {
  typeUrl: string;
};

export default function PokemonType({ typeUrl }: PokemonTypeProps) {
  const {
    data: pokeTypeData,
    isLoading,
    error,
  } = useQuery<any, DefaultError>({
    queryKey: ["pokemontype", typeUrl],
    queryFn: () => PokemonService.getPokemonTypes(typeUrl),
    select: (data) => ({
        name_icon: data.sprites["generation-iii"].colosseum
        .name_icon,
      }),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching type details: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pokeTypeData.name_icon }}
        style={styles.sprite}
        resizeMode="contain"
        testID="pokemon-image"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingEnd: 8,
  },
  sprite: {
    width: 40,
    height: 16,
  },
});
