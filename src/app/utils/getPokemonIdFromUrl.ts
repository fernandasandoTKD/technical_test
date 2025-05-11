export function getPokemonIdFromUrl(url: string): number {
  // Remover strings vacíos
  const parts = url.split("/").filter(Boolean); 
  // Tomar el último valor luego del slash
  const id = parts[parts.length - 1]; 
  return Number(id);
}
