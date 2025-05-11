'use client';

/**
 * Importa hooks personalizados para obtener:
 * - Hooks useState para manejo de estados
 * - Tipos de Pokémon
 * - Lista general de Pokémon
 * - Lista filtrada por tipo
 */
import { useState } from 'react';
import { usePokemonByType } from '@/app/hooks/usePokemonByType';
import { usePokemonTypes } from '@/app/hooks/usePokemonTypes';
import { usePokemonList } from '@/app/hooks/usePokemonList';


/**
 * Importación de función para obtener el ID de un Pokémon desde su URL.
 */
import { getPokemonIdFromUrl } from '@/app/utils/getPokemonIdFromUrl';
import Card from '@/app/components/Card';


/**
 * Página principal donde se muestran los Pokémon.
 * Permite filtrar por tipo, buscar por nombre y navegar entre páginas.
 */
export default function HomePage() {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

    /* Llama a los hooks para obtener datos */
  const { data: types } = usePokemonTypes();
  const { data: allPokemon, isLoading: loadingAll } = usePokemonList(currentPage, pageSize);
  const { data: filteredPokemonByType, isLoading: loadingFilter } = usePokemonByType(selectedType);

  const isFiltering = selectedType !== '' || searchTerm !== '';
  const isLoading = selectedType ? loadingFilter : loadingAll;

  // Aplica filtro por tipo o nombre (localmente sobre la lista obtenida)
  let filteredPokemon = selectedType ? filteredPokemonByType : allPokemon;

  //Lógica para aplicar filtro por nombre en la página actual
  if (searchTerm && filteredPokemon) {
    filteredPokemon = filteredPokemon.filter((p: any) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  //Limpieza de filtros y reinicio de página
  const handleClearFilters = () => {
    setSelectedType('');
    setSearchTerm('');
    setCurrentPage(1);
  };


  // Lógica para cambio de página
  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  //Renderización de interfaz
  return (
    <div className="p-6">
      <h3 className="text-2xl text-center font-semibold  bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
        BUSCA TU POKEMÓN
      </h3>

      <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
        <select
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          value={selectedType}
          className="p-2 border rounded text-green-600  bg-amber-50
          "
        >
          <option value="">-- Filtrar por tipo --</option>
          {types?.map((t: any) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded text-black bg-amber-50"
        />

        {(selectedType || searchTerm) && (
          <button
            onClick={handleClearFilters}
            className="bg-orange-400 text-white px-4 py-2 rounded"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-center">Cargando Pokémon...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-black mt-10">
            {filteredPokemon?.slice(0, pageSize).map((pokemon: any) => (
              <Card
                key={pokemon.name}
                name={pokemon.name}
                id={Number(getPokemonIdFromUrl(pokemon.url))}
              />
            ))}
          </div>

          {!isFiltering && (
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="bg-yellow-400 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                ←
              </button>
              <span className="text-green-600 font-semibold mt-1.5">Página {currentPage}</span>
              <button
                onClick={handleNext}
                className="bg-green-400 text-white px-4 py-2 rounded"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );

}
