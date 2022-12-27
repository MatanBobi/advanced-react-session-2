export function Header({
  onChangeShowPokemons,
  pokemonsLength,
  caughtPokemonsLength,
}: {
  onChangeShowPokemons: React.Dispatch<React.SetStateAction<boolean>>;
  pokemonsLength: number;
  caughtPokemonsLength: number;
}) {
  return (
    <>
      <aside>Uncaught Pokemons: {pokemonsLength - caughtPokemonsLength}</aside>
      <div>
        <span>Show only uncaught pokemons</span>
        <input
          type="checkbox"
          onChange={() => onChangeShowPokemons((prev) => !prev)}
        />
      </div>
    </>
  );
}
