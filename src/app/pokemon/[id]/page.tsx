'use client';

import { useParams } from 'next/navigation';
import { usePokemonDetail } from '@/app/hooks/usePokemonDetail';
import Link from 'next/link';

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params?.id?.toString();

  const { data, isLoading, error } = usePokemonDetail(id);

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error al cargar el Pokémon.</p>;

  return (

    <div className="flex flex-col h-auto bg-neutral-800 text-white p-6 gap-6 rounded-2xl mx-3 my-5 relative">
      <div className="self-start">
      <Link
        href="/"
        className="bg-yellow-500 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm transition"
      >
        ← Volver
      </Link>
    </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold capitalize">{data.name}</h1>
        <hr className="border-gray-500 my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xl mx-3">

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 max-w-full max-h-full">
              <img
                src={data.sprites.front_default}
                alt={data.name}
                className="mx-auto w-full"
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="font-semibold">Tipos:</h2>
              <ul className="flex justify-center flex-wrap gap-2 mt-2">
                {data.types.map((t: any) => (
                  <li key={t.type.name} className="capitalize px-2 py-1 bg-gray-200 rounded text-black">
                    {t.type.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-center">Estadísticas</h2>
            <div className="space-y-3">
              {data.stats.map((stat: any) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full"
                      style={{ width: `${(stat.base_stat / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>

  );
}
