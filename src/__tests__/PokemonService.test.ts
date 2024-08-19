// __tests__/PokemonService.test.ts
import axios from 'axios';
import { PokemonService } from '../services';
import { PokemonErrorType } from '../utils/erorrs/error-types';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return data when response status is less than 400', async () => {
    const mockData = { name: 'bulbasaur' };
    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await PokemonService.getPokemonDetails('https://pokeapi.co/api/v2/pokemon/1');
    expect(result).toEqual(mockData);
  });

  test('should handle network errors correctly', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(PokemonService.getPokemonDetails('https://pokeapi.co/api/v2/pokemon/1')).rejects.toEqual(PokemonErrorType.NetworkError);
  });

});
