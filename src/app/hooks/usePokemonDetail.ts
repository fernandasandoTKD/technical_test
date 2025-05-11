import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function usePokemonDetail(id?: string | number) {
  return useQuery({
    queryKey: ['pokemon-detail', id],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      return res.data;
    },
    enabled: !!id,
  });
}
