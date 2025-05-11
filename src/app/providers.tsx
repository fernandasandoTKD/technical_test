"use client";

/**
 * Importa QueryClient y QueryClientProvider de react-query.
 * - QueryClient: crea u objeto que gestiona las peticiones y caché.
 * - QueryClientProvider: permite que los componentes hijos usen react-query.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";



/**
 * Función proveedora para react-query
 * @param children Componentes hijos que estarán envueltos por el proveedor.
 * Crea un solo cliente de QueryClient y lo pasa al QueryClientProvider.
 * Esto permite que todos los componentes hijos usen las funcionalidades de react-query.
 */
export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

