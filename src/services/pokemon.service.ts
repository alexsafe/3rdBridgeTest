import axios from "axios";
import { Species } from "../models";
import { handleApiError } from "../utils/erorrs/error.handler.";
import { apiError } from "../utils/erorrs/api.errors";

class PokemonServiceImpl {
  async getPokemons({
    limit = 20,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }) {
    const response = await this.getApi(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );

    return response.results;
  }

  async getPokemonTypes(url: string) {
    const response = await this.getApi(url);
    return response;
  }

  async getPokemonDetails(url: string) {
    const response = await this.getApi(url);
    return response;
  }

  async getPokemonSpecies(url: string) {
    const response = await this.getApi(url);
    return response;
  }

  async getPokemonSpeciesEvolution(url: string) {
    const response = await this.getApi(url);
    return response;
  }

  async getEvolutionChain(url: string) {
    const response = await this.getApi(url);
    return response.data;
  }

  async getApi(url: string | undefined) {
    try {
      const response = await axios.get(url!);
      if (response.status >= 400) {
        throw apiError(
          `Error fetching data: ${response.statusText}`,
          response.status,
          response.data?.message
        );
      }
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw apiError(
          `Error fetching data: ${error.response.statusText}`,
          error.response.status,
          error.response.data?.message
        );
      } else if (error.request) {
        // Errors where the request was made but no response was received
        throw apiError(`Network error: No response received`, 0);
      } else {
        // Errors during the request setup
        throw apiError(`${error.message}`, 0);
      }
    }
  }
}

export const PokemonService = new PokemonServiceImpl();
