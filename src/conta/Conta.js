import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Conta.css";

const Conta = ({ saldo, realizarTransacao }) => {
  const [valores, atualizarValores] = useState({ transacao: "", valor: 0 });

  function handleChange(e) {
    const { name, value } = e.target;
    const valoresAtualizados = { ...valores, [name]: value };

    atualizarValores(valoresAtualizados);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const dataTransacao = new Date().toLocaleDateString("pt-br");
    realizarTransacao({ ...valores, data: dataTransacao });
  }

  return (
    <div className="Conta-header">
      <h2
        style={{
          fontWeight: "bold",
        }}
      >
        Conta
      </h2>
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        Saldo:{" "}
        <span
          data-testid="saldo-conta"
          className="Saldo-valor"
        >{`R$ ${saldo}`}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            style={{
              fontWeight: "bold",
            }}
          >
            Depósito
            <input
              type="radio"
              name="transacao"
              value="deposito"
              onChange={handleChange}
              data-testid="transacao"
              checked={valores.transacao === "deposito"}
            />
          </label>
        </div>

        <div>
          <label
            style={{
              fontWeight: "bold",
            }}
          >
            Saque
            <input
              type="radio"
              name="transacao"
              value="saque"
              data-testid="transacao"
              onChange={handleChange}
              checked={valores.transacao === "saque"}
            />
          </label>
        </div>

        <label
          style={{
            fontWeight: "bold",
          }}
        >
          Valor:{" "}
        </label>
        <input
          style={{
            margin: "10px",
            padding: "5px",
            width: "150px",
          }}
          type="text"
          name="valor"
          value={valores.valor}
          data-testid="valor"
          onChange={handleChange}
        ></input>

        <div>
          <button
            style={{
              backgroundColor: "#ADD8E6",
              margin: "10px",
              fontWeight: "bold",
              padding: "6px 10px",
            }}
            type="submit"
          >
            Realizar operação
          </button>
        </div>
      </form>
    </div>
  );
};

Conta.defaultProps = {
  saldo: 0,
};

Conta.propTypes = {
  saldo: PropTypes.number,
};

export default Conta;
