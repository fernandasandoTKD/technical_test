'use client';

import Link from "next/link";

/**
 * Componente tarjera para mostrar el nombre de un Pokémon.
 */

export default function Card({ name,id }: { name: string , id?:number}) {

  return (
    <div
          className="div h-[8em] w-[15em] bg-amber-50 m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden items-center justify-center"
        >
          <div className="z-[-1] h-full w-[200%] rounded-[1em] bg-gradient-to-br from-green-400 via-lime-400 to-yellow-400 absolute bottom-full right-0 group-hover:-rotate-90 group-hover:h-[300%] duration-500 origin-bottom-right"></div>

          <button className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-[white] duration-500">
            <Link className="relative before:h-[0.16em] before:absolute before:w-full before:content-[''] before:bg-[#6C3082] group-hover:before:bg-[white] duration-300 before:bottom-0 before:left-0" href={`/pokemon/${id}`}>
              Más información
            </Link>
          </button>

          <h1 className="flex items-center justify-center h-full w-full uppercase font-bold text-[1.4em] font-Poppin group-hover:text-white duration-500">
            {name}
          </h1>

        </div>
  );
}
