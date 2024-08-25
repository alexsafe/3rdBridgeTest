import { PokemonService } from "../services";

describe("PokemonService Integration Tests", () => {
  jest.setTimeout(10000);

  test("should return valid data for a known Pokémon", async () => {
    const pokemonId = 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    const data = await PokemonService.getPokemonDetails(url);

    expect(data).toHaveProperty("name", "bulbasaur");
    expect(data).toHaveProperty("id", pokemonId);
    expect(data).toHaveProperty("sprites");
    expect(data).toHaveProperty("types");
  });

  test("should throw an error for an invalid Pokémon ID", async () => {
    const invalidPokemonId = 9999999;
    const url = `https://pokeapi.co/api/v2/pokemon/${invalidPokemonId}`;

    await expect(PokemonService.getPokemonDetails(url)).rejects.toThrow(
      "Error fetching data: Not Found"
    );
  });
});
