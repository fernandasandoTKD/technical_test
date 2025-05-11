/**
 * Hook personalizado para obtener una lista paginada de Pokémon.
 * @param page Número de página actual.
 * @param pageSize Cantidad de Pokémon por página.
 * 
 * Calcula el offset y realiza la consulta para obtener un subconjunto de Pokémon, retorna listado de pokemones.
 */
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

