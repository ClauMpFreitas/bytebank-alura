import Transacao from "../transacoes/Transacao";
import React from "react";
import { render } from "@testing-library/react";

describe("Componente de transação do extrato", () => {
  it("O snapshot do componente deve permanecer sempre o mesmo", () => {
    const { asFragment } = render(
      <Transacao data="08/09/2020" tipo="saque" valor="20.00" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
