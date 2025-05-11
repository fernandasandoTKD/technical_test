// Importar funciones necesarias para testear componentes React
import { render, screen } from '@testing-library/react';
//Im portación de componente a testear
import PokemonCard from '../components/PokemonCard';
import '@testing-library/jest-dom';

// Simulación de data a testear
const dataTests = {
  name: 'pikachu',
  weight: 60,
  height: 4,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
  },
  types: [
    { type: { name: 'electric' } },
  ],
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
  ],
};

// Grupo de tests para el componente PokemonCard
describe('PokemonCard component', () => {
   // Test 1: Verifica si el componente muestra correctamente el nombre, imagen y tipos
  test('renderiza correctamente nombre, imagen y tipos', () => {
    render(<PokemonCard data={dataTests} />);

    // Busca el encabezado por su rol y nombre 
    const heading = screen.getByRole('heading', { name: /detalle de pokémon pikachu/i });
    expect(heading).toBeInTheDocument();

     // Busca la imagen por su texto alternativo
    const image = screen.getByAltText(/pikachu/i);
    expect(image).toHaveAttribute('src', dataTests.sprites.front_default);

    // Verifica que el tipo del Pokémon esté visible
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  // Test 2: Verifica que el botón "Volver" no se muestre si se indica que no debe aparecer
  test('no muestra el botón "Volver" si showBackButton es false', () => {
    render(<PokemonCard data={dataTests} showBackButton={false} />);
    const backButton = screen.queryByText(/volver/i);
    expect(backButton).not.toBeInTheDocument();
  });
});
