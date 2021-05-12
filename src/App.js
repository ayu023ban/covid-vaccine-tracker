import "fomantic-ui-css/semantic.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Home from "./view/Home";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
export default App;
