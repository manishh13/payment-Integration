import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Failure from "./pages/Failure";
import Success from "./pages/Success";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Products} />
        <Route path="/failure" Component={Failure} />
        <Route path="/success" Component={Success} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
