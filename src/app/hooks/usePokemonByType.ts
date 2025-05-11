/**
 * Importa el hook useQuery de react-query para gestionar la consulta.
 * Importa axios para hacer la petición HTTP a la API de Pokémon.
 */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


/**
 * Hook personalizado para obtener los Pokémon según su tipo.
 * @param type Tipo de Pokémon
 * 
 * Si se proporciona un tipo, hace una consulta a la API y retorna el listado
 */
export function usePokemonByType(type: string) {
  return useQuery({
    queryKey: ['pokemon-by-type', type],
    queryFn: async () => {
      // Realiza la petición a la API usando el tipo
      const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      return res.data.pokemon.map((p: any) => p.pokemon); 
    },
    // Se ejecuta si no hay un tipo seleccionado
    enabled: !!type,
  });
}
