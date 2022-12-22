import { Pokemon } from "./types";

export function PokemonItem({
  pokemon,
  onChange,
  isCaught,
}: {
  pokemon: Pokemon;
  onChange: (pokemon: Pokemon, caught: boolean) => void;
  isCaught: boolean;
}) {
  return (
    <div className="pokemon-row">
      <span
        onClick={() => {
          onChange(pokemon, !isCaught);
        }}
      >
        {pokemon.name}
      </span>
      <input
        type="checkbox"
        checked={isCaught}
        onChange={() => {
          onChange(pokemon, !isCaught);
        }}
      />
    </div>
  );
}

import React from "react";
const ModalContext = React.createContext(null);

const Modal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const value = [isOpen, setIsOpen];

  return <ModalContext.Provider value={value} {...props} />;
};
