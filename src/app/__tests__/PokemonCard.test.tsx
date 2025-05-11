import { render, screen } from '@testing-library/react';
import PokemonCard from '../components/PokemonCard';
import '@testing-library/jest-dom';

const dateTests = {
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

describe('PokemonCard component', () => {
  test('renderiza correctamente nombre, imagen y tipos', () => {
    render(<PokemonCard data={dateTests} />);

    // Solo verificamos el título principal
    const heading = screen.getByRole('heading', { name: /detalle de pokémon pikachu/i });
    expect(heading).toBeInTheDocument();

    // Verifica imagen por alt
    const image = screen.getByAltText(/pikachu/i);
    expect(image).toHaveAttribute('src', dateTests.sprites.front_default);

    // Verifica los tipos
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  test('no muestra el botón "Volver" si showBackButton es false', () => {
    render(<PokemonCard data={dateTests} showBackButton={false} />);
    const backButton = screen.queryByText(/volver/i);
    expect(backButton).not.toBeInTheDocument();
  });
});
