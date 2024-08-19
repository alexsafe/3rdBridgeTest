import React from 'react';
import { render, screen } from '@testing-library/react-native';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonType from '../components/pokemon-types';


const mockAxios = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('PokemonType Component', () => {
  const typeUrl = 'https://pokeapi.co/api/v2/type/1/';

  const setup = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <PokemonType typeUrl={typeUrl} />
      </QueryClientProvider>
    );

  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('displays loading initially', () => {
    setup();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });


  it('displays the correct image when data is fetched successfully', async () => {
    const mockResponse = {
      sprites: {
        'generation-iii': {
          colosseum: {
            name_icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/colosseum/1.png',
          },
        },
      },
    };

    mockAxios.onGet(typeUrl).reply(200, mockResponse);

    setup();

    // const image = await screen.findByRole('image');
    const image = await screen.findByTestId('pokemon-image');
    expect(image.props.source.uri).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/colosseum/1.png');
  });
});
