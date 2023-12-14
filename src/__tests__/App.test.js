import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App, { calcularNovoSaldo } from "../App";

describe("Componente principal", () => {
  describe("Quando eu abro o app do banco", () => {
    it("Mostrar o nome do banco", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });
    it("Mostrar saldo", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });
    it("Mostrar o botão de fazer transações", () => {
      render(<App />);
      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });
  describe("Quando realizo uma transação", () => {
    it("Sendo um saque, o valor irá diminuir", () => {
      const valor = {
        transacao: "saque",
        valor: 50,
      };

      const novoSaldo = calcularNovoSaldo(valor, 150);

      expect(novoSaldo).toBe(100);
    });
    it("Sendo um saque, a transação deve ser realizada", () => {
      render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: "saque" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe("R$ 990");
    });
    it("Sendo um depósito, o valor irá aumentar", () => {
      const valor = {
        transacao: "deposito",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valor, 150);

      expect(novoSaldo).toBe(200);
    });
    it("Sendo um depósito, a transação deve ser realizada", () => {
      render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Depósito");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: "deposito" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe("R$ 1010");
    });
  });
});
