import React, { useEffect, useState } from "react";
import Conta from "./conta/Conta";
import Transacoes from "./transacoes/Transacoes";
import api from "./api";
import { act } from "react-dom/test-utils";
import "./App.css";

export const calcularNovoSaldo = (valor, saldo) => {
  if (valor.transacao === "deposito") {
    return saldo + parseInt(valor.valor);
  } else {
    return saldo - parseInt(valor.valor);
  }
};

function App() {
  const [saldo, atualizarSaldo] = useState(1000);
  const [transacoes, atualizarTransacoes] = useState([]);

  async function carregarTransacoes() {
    const transacoes = await api.listaTransacoes();
    atualizarTransacoes(transacoes);
  }

  async function obterSaldo() {
    await act(async () => {
      atualizarSaldo(await api.buscaSaldo());
    });
  }

  function realizarTransacao(valor) {
    const novoSaldo = calcularNovoSaldo(valor, saldo);

    api.atualizaSaldo(novoSaldo).catch((error) => console.error(error));
    api.atualizaTransacoes(valor).catch((error) => console.error(error));

    atualizarSaldo(novoSaldo);
    atualizarTransacoes([valor]);
  }

  useEffect(() => {
    obterSaldo();
    carregarTransacoes();
  }, [saldo]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ByteBank</h1>
      </header>

      <Conta saldo={saldo} realizarTransacao={realizarTransacao} />
      <Transacoes transacoes={transacoes} />
    </div>
  );
}

export default App;
