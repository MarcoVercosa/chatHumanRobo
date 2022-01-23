import React from 'react';
import { useSelector } from "react-redux"

import Tela_Inicial from './chat/tela_inicial/telaInicial';
import Chat from './chat/chat/chat';
import { changeDadosTelaInicialReducer } from './store/reducers/telaInicial.reducer';


import './App.css';

function App() {
  console.log("app.tsx")

  const dadosTelaInicialReducer: any = useSelector((state: any) => state.changeDadosTelaInicialReducer)

  return (
    <div className="App">
      <Tela_Inicial />
      {/* se true, o component Chat é renderizado  */}
      {dadosTelaInicialReducer.activeComponentChat &&
        <Chat />
      }

    </div>
  );
}

export default App;
