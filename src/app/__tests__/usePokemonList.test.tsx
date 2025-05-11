// Importar funciones para testear hooks y simular espera de datos asincrónicos.
import { renderHook, waitFor } from '@testing-library/react';
// Importación de hook a probar
import { usePokemonList } from '../hooks/usePokemonList';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Se simula axios para que NO haga llamadas reales a la API
jest.mock('axios');

// Se fuerza a que axios tenga el tipo simulado, para evitar errores en TS
const mockedAxios = axios as jest.Mocked<typeof axios>;


// Crea un proveedor para envolver el hook con React Query 
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};



describe('usePokemonList', () => {
  // Prueba específica: verificar que obtiene y devuelve la lista de Pokémon correctamente
  it('fetches and returns the Pokémon list', async () => {
    const dataTests = {
      data: {
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      },
    };

    // Simular que axios.get devuelve esos datos sin error
    mockedAxios.get.mockResolvedValue(dataTests);

     // Ejecutar el hook como si fuera usado en un componente real
    const { result } = renderHook(() => usePokemonList(1, 2), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=2&offset=0'
    );
    // Verificar que los datos recibidos son los mismos que simulamos
    expect(result.current.data).toEqual(dataTests.data.results);
  });
});
