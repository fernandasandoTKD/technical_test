export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean); // remueve strings vacíos
  const id = parts[parts.length - 1]; // el último valor después del último slash
  return Number(id);
}
