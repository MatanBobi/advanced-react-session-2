import "./App.css";
import { Pokemons } from "./Pokemons";
import { withMousePosition } from "./withMousePosition";

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <Pokemons />
    </div>
  );
}

export default withMousePosition(App);
