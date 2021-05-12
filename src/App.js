import "fomantic-ui-css/semantic.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Home from "./view/Home";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ReactGA from "react-ga";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-VTP0D34CDL");
  }, []);
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
export default App;
