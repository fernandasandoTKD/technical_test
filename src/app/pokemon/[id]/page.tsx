'use client';

/**
 * Importa el hook useParams para obtener los parámetros de la URL.
 * Importa el hook usePokemonDetail para obtener los datos del Pokémon por ID.
 * Importa el componente PokemonCard para mostrar los detalles.
 */
import { useParams } from 'next/navigation';
import { usePokemonDetail } from '@/app/hooks/usePokemonDetail';
import PokemonCard from '@/app/components/PokemonCard';

/**
 * función para detalle de Pokemón. 
 * Obtiene el ID desde la URL, luego carga los datos del Pokémon y los muestra.
 */

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params?.id?.toString();
  // Uso de hoook para obtener ID
  const { data, isLoading, error } = usePokemonDetail(id);

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error al cargar el Pokémon.</p>;

  // Retorna la tarjeta con la información de pokemón.
  return <PokemonCard data={data} />;
}
