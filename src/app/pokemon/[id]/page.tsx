'use client';

import { useParams } from 'next/navigation';
import { usePokemonDetail } from '@/app/hooks/usePokemonDetail';
import PokemonCard from '@/app/components/PokemonCard';

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params?.id?.toString();
  const { data, isLoading, error } = usePokemonDetail(id);

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error al cargar el Pokémon.</p>;

  return <PokemonCard data={data} />;
}
