import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import PageHome from "../Pages/PageHome";
import PageList from "../Pages/PageList";

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PageHome} />
        <Route path="/pagelist" component={PageList} />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
