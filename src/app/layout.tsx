import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";


/**
 * Configuración de las fuentes personalizadas usando Google Fonts.
 * Se asignan variables CSS para usarlas en todo el proyecto.
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Api Poikemón",
  description: "Generated by create next app",
};


/**
 * Layout principal de la aplicación.
 * @param children Contenido principal que se va a mostrar en cada página.
 * 
 * El componente Providers envuelve toda la aplicación con el
 * contexto de react-query, para que culauier componentes pueda hacer las peticiones y manejar el caché.
 */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
