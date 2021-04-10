import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import PageHome from "../Pages/PageHome";

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PageHome} />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
