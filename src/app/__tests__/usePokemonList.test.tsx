// __tests__/usePokemonList.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { usePokemonList } from '../hooks/usePokemonList';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('usePokemonList', () => {
  it('fetches and returns the Pokémon list', async () => {
    const mockData = {
      data: {
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue(mockData);

    const { result } = renderHook(() => usePokemonList(1, 2), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=2&offset=0'
    );

    expect(result.current.data).toEqual(mockData.data.results);
  });
});
