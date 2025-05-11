'use client';

import { usePokemonDetail } from "../hooks/usePokemonDetail";

export default function PokemonDetail({ id }: { id: string }) {
  const { data, isLoading } = usePokemonDetail(id);

  if (isLoading) return <p>Cargando...</p>;
  if (!data) return <p>No se encontró el Pokémon.</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
    </div>
  );
}
