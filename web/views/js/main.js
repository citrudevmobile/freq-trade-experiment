import { render } from "react-dom";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "../components/home";

const rootElement = document.getElementById("app")

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);