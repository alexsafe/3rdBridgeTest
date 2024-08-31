// __tests__/PokemonService.test.ts
import axios from 'axios';
import { PokemonService } from '../services';
import { PokemonErrorType } from '../utils/erorrs/error.types';
import { apiError } from '../utils/erorrs/api.errors';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return data when response status is less than 400', async () => {
    const mockData = { name: 'bulbasaurus' };
    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await PokemonService.getPokemonDetails('https://pokeapi.co/api/v2/pokemon/1');
    expect(result).toEqual(mockData);
  });

  test('should handle network errors correctly', async () => {
    // Mock a network error
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
  
    await expect(PokemonService.getApi('https://pokeapi.co/api/v2/pokemon/1')).rejects.toEqual(
      apiError('Network Error', 0)
    );
  });

  test('should handle 400 status code as an error', async () => {
    const errorMessage = 'Error fetching data: Bad Request';
    const status = 400;
    const details = 'Bad Request';
    mockedAxios.get.mockResolvedValueOnce({
      status,
      statusText: 'Bad Request',
      data: { message: details },
    });

    await expect(PokemonService.getApi('https://api.example.com/data')).rejects.toEqual(
      apiError(errorMessage, status, details)
    );
  });

  test('should handle 500 status code as an error', async () => {
    const errorMessage = 'Error fetching data: Internal Server Error';
    const status = 500;
    const details = 'Internal Server Error';
    mockedAxios.get.mockResolvedValueOnce({
      status,
      statusText: 'Internal Server Error',
      data: { message: details },
    });

    await expect(PokemonService.getApi('https://api.example.com/data')).rejects.toEqual(
      apiError(errorMessage, status, details)
    );
  });

});
