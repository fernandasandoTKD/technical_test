import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePokemonList = (page = 1, pageSize = 12) => {
  const offset = (page - 1) * pageSize;
  return useQuery({
    queryKey: ['pokemon-list', page],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`);
      return res.data.results;
    },
  });
};

