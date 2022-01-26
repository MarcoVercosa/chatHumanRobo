import React from 'react';
import { useSelector } from "react-redux"

import Tela_Inicial from './app/tela_inicial/telaInicial';
import Chat from './app/chat/chat';
import { changeDadosTelaInicialReducer } from './store/reducers/telaInicial.reducer';


import './App.css';

function App() {
  console.log("app.tsx")

  const dadosTelaInicialReducer: any = useSelector((state: any) => state.changeDadosTelaInicialReducer)

  return (
    <div className="App">

      {/* se true, o component Tela Inicial é renderizado  */}
      {dadosTelaInicialReducer.componentTelaInicial &&
        <Tela_Inicial />
      }

      {/* se true, o component Chat é renderizado  */}
      {dadosTelaInicialReducer.activeComponentChat &&
        <Chat />
      }

    </div>
  );
}

export default App;
