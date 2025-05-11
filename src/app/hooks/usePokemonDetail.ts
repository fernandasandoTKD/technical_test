/**
 * Hook personalizado para obtener los detalles de un Pokémon específico.
 * @param id ID o nombre del Pokémon.
 * 
 */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function usePokemonDetail(id?: string | number) {
  return useQuery({
    // Clave única para el caché de react-query
    queryKey: ['pokemon-detail', id],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      return res.data;
    },
    // Solo se ejecuta si el ID está definido
    enabled: !!id,
  });
}
