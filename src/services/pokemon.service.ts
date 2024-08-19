import axios from "axios";
import { Species } from "../models";
import { handleApiError } from "../utils/erorrs/apiErrors";

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
      // console.log(`getApi url: ${url}`);
      const response = await axios.get(url!);
      // console.log("generic api call");
      // console.log(response);
      if (response.status < 400) {
        // console.log(`all good for ${url}`);
        // console.log(response.data);
        return response.data;
      } 
      else {
        // console.log(`error : ${response}  ${response.status}`);
        throw handleApiError(response);
      }
    } catch (error) {
      // console.log(`error fetching data from ${error}`);
      throw handleApiError(error);
    }
  }
}

export const PokemonService = new PokemonServiceImpl();
