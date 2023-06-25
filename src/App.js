import React from "react";
import { Header } from "./componentes/Header";
import { ProductosLista } from "./componentes/Productos/index";
import 'boxicons';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
        <ProductosLista/>
      </header>
    </div>
  );
}

export default App;
