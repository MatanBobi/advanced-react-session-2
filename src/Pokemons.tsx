import React, { useEffect, useState } from "react";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader";

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const result = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  ).then((res) => res.json());
  return result.results;
};

export function Pokemons() {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [showOnlyUnacughtPokemons, setShowOnlyUncaughtPokemons] =
    useState(false);
  const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });

  const visiblePokemons = React.useMemo(() => {
    if (showOnlyUnacughtPokemons) {
      return pokemons.filter((pokemon) => !caughtPokemons.includes(pokemon));
    }

    return pokemons;
  }, [caughtPokemons, pokemons, showOnlyUnacughtPokemons]);

  const handlePokemonCaught = (pokemon: Pokemon, caught: boolean) => {
    setCaughtPokemons((prev) => {
      if (caught) {
        if (prev.includes(pokemon)) {
          return prev;
        }

        return [...prev, pokemon];
      } else {
        return prev.filter((item) => item !== pokemon);
      }
    });
  };

  return (
    <div className="max-h-screen flex flex-col border-r border-r-slate-300 dark:border-r-slate-600 dark:bg-gray-800 overflow-auto">
      <aside>
        Uncaught Pokemons: {pokemons.length - caughtPokemons.length}
      </aside>
      <div>
        <label>
          Show only uncaught pokemons
          <input
            className="mx-2 cursor-pointer"
            type="checkbox"
            onChange={() => setShowOnlyUncaughtPokemons((prev) => !prev)}
          />
        </label>
      </div>
      <Loader isLoading={isLoading} isError={isError}>
        {visiblePokemons.map((pokemon) => (
          <PokemonItem
            key={pokemon.name}
            pokemon={pokemon}
            onChange={handlePokemonCaught}
            isCaught={caughtPokemons.includes(pokemon)}
          />
        ))}
      </Loader>
    </div>
  );
}
