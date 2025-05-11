// hooks/usePokemonByType.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function usePokemonByType(type: string) {
  return useQuery({
    queryKey: ['pokemon-by-type', type],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      return res.data.pokemon.map((p: any) => p.pokemon); 
    },
    enabled: !!type,
  });
}
