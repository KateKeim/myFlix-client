import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import { store } from "./redux/store";
import { Provider } from "react-redux";
const App = () => {
  
  return (
    <Provider store={store}>

    <Container>
      <MainView />
    </Container>
    </Provider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);