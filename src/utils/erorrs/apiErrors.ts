import { PokemonErrorType } from "./error-types";

export const handleApiError = (error: any): PokemonErrorType => {
  if (!error.response) {
    return PokemonErrorType.NetworkError;
  }

  switch (error.response.status) {
    case 404:
      return PokemonErrorType.NotFound;
    case 500:
      return PokemonErrorType.Unexpected;
    default:
      return PokemonErrorType.UnknownError;
  }
};
