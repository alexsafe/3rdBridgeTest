import { ApiErrorType } from "./api.errors";
import { PokemonErrorType } from "./error.types";

export const handleApiError = (error: ApiErrorType): PokemonErrorType => {
  switch (error.status) {
    case 0:
      return PokemonErrorType.URLError;
    case 404:
      return PokemonErrorType.NotFound;
    case 500:
      return PokemonErrorType.Unexpected;
    default:
      return PokemonErrorType.UnknownError;
  }
};
