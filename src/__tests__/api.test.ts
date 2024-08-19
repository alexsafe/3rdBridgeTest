// src/__tests__/api.test.ts
import axios from 'axios';
import { handleApiError } from '../utils/erorrs/apiErrors';
import { PokemonErrorType } from '../utils/erorrs/error-types';
import { PokemonService } from '../services/pokemon.service';

jest.mock('axios');

describe('API Error Handling', () => {
  it('should handle API errors correctly', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({
      response: { status: 404 },
    });

    try {
      await PokemonService.getPokemonSpecies('some-url');
    } catch (error) {
      const handledError = handleApiError(error);
      expect(handledError).toEqual(PokemonErrorType.NetworkError);
    }

    expect(axios.get).toHaveBeenCalledWith('some-url');
  });
});
