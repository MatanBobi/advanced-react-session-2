import React, { useEffect, useState } from "react";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";

export function Pokemons() {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [showOnlyUnacughtPokemons, setShowOnlyUncaughtPokemons] =
    useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  const visiblePokemons = React.useMemo(() => {
    if (showOnlyUnacughtPokemons) {
      return pokemons.filter((pokemon) => !caughtPokemons.includes(pokemon));
    }

    return pokemons;
  }, [caughtPokemons, pokemons, showOnlyUnacughtPokemons]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    <div>
      <aside>
        Uncaught Pokemons: {pokemons.length - caughtPokemons.length}
      </aside>
      <div>
        <span>Show only uncaught pokemons</span>
        <input
          type="checkbox"
          onChange={() => setShowOnlyUncaughtPokemons((prev) => !prev)}
        />
      </div>
      {visiblePokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.name}
          pokemon={pokemon}
          onChange={handlePokemonCaught}
          isCaught={caughtPokemons.includes(pokemon)}
        />
      ))}
    </div>
  );
}
