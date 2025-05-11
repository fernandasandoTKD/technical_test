/**
 * Hook personalizado para obtener todos los tipos de Pokémon disponibles.
 * 
 * Realiza una consulta a la API para taer los nombres de los tipos.
 */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function usePokemonTypes() {
  return useQuery({
    //Calve estatica que no cambia
    queryKey: ['pokemon-types'],
    queryFn: async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/type');
      //Devuelve lista de tipos
      return res.data.results;
    },
  });
}
