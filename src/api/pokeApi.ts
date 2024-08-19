import axios from "axios";

export const fetchPokemonList = async () => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  return response.data.results;
};

export const fetchPokemonDetails = async (pokemonId: string) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  return response.data;
};
