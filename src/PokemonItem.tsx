import { Pokemon } from "./types";
import infoIcon from "./assets/info.svg";

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
      {/* <img src={infoIcon} style={{ height: 24, width: 24 }} alt="info" /> */}
    </div>
  );
}
