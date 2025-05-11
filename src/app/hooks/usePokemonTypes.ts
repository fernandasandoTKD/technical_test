// hooks/usePokemonTypes.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function usePokemonTypes() {
  return useQuery({
    queryKey: ['pokemon-types'],
    queryFn: async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/type');
      return res.data.results;
    },
  });
}
