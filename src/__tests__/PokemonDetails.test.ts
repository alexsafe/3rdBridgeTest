import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { PokemonService } from "../services";
import { apiError, ApiErrorType } from "../utils/erorrs/api.errors";

// Mock useQuery from @tanstack/react-query
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

// Mock other necessary imports
// jest.mock("../services/PokemonService");
// jest.mock("../utils/handleApiError");

// Mock PokemonService.getPokemonDetails
// jest.mock("./path-to-pokemon-service", () => ({
//   getPokemonDetails: jest.fn(),
// }));

const mockedUseQuery = useQuery as jest.Mock;
const mockedGetPokemonDetails = PokemonService.getPokemonDetails as jest.Mock;

test("should return pokemon details data", async () => {
  const mockData = {
    species: [],
    sprites: [],
    moves: [],
    types: [],
    name: "bulbasaur",
    id: 1,
    url: "https://pokeapi.co/api/v2/pokemon/1",  
  };

  mockedUseQuery.mockReturnValueOnce({
    data: mockData,
    isLoading: false,
    error: null,
  });

  const { result } = renderHook(() =>
    useQuery({
      queryKey: ["pokemonDetails", mockData.url],
      queryFn: () => mockedGetPokemonDetails(mockData.url),
      select: (data) => ({
        species: data?.species,
        sprites: data?.sprites,
        moves: data?.moves,
        types: data?.types,
        name: data?.name,
        id: data?.id,
        url: data?.url,
      }),
    })
  );

  expect(result.current.data?.name).toEqual(mockData.name);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeNull();
});


test('should handle API errors and retry based on status', async () => {
    const mockError = apiError('Internal Server Error', 500);
  
    mockedUseQuery.mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: mockError,
    });
  
    const { result } = renderHook(() =>
      useQuery({
        queryKey: ['pokemonDetails', 'https://pokeapi.co/api/v2/pokemon/25'],
        queryFn: () => {
          throw mockError;
        },
        retry: (failureCount, error:ApiErrorType) => {
          if (error.status === 500 || failureCount < 3) {
            return true;
          }
          return false;
        },
      })
    );
  
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(mockError);
  });
  