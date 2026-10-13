import { useState, type FormEvent } from "react";
import { useStore } from "../store/StoreContext";
import { EmptyState, OrderSummary } from "./CartPage";
import { Modal } from "./Modal";
import { Icon } from "./Icon";
const STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
export function CheckoutPage() {
  const { state } = useStore();
  const [confirmed, setConfirmed] = useState(false);
  function simulate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setConfirmed(true);
  }
  return (
    <section className="container innerPage checkoutPage">
      <div className="breadcrumbs">
        <a href="#/">Início</a>
        <span>/</span>
        <a href="#/carrinho">Carrinho</a>
        <span>/</span>
        <span>Simulação</span>
      </div>
      <div className="pageHeading">
        <span className="eyebrow">ÚLTIMO PASSO DA EXPERIÊNCIA</span>
        <h1>Vamos simular?</h1>
        <p>Conheça como seria o caminho até finalizar sua escolha.</p>
      </div>
      <div className="checkoutWarning">
        <Icon name="spark" width={24} height={24} />
        <div>
          <strong>
            Esta é uma demonstração. Nenhum pedido ou pagamento será realizado.
          </strong>
          <p>
            Use dados fictícios para experimentar. Nenhuma informação será
            enviada ou salva.
          </p>
        </div>
      </div>
      {state.cart.length ? (
        <div className="checkoutLayout">
          <form className="checkoutForm" onSubmit={simulate} autoComplete="off">
            <fieldset>
              <legend>
                <span className="stepNumber">1</span> Identificação
              </legend>
              <p>Preencha os campos com dados fictícios.</p>
              <div className="formGrid">
                <label className="fullField">
                  Nome completo
                  <input
                    name="nome"
                    required
                    minLength={3}
                    placeholder="Ex.: Maria de Exemplo"
                    autoComplete="off"
                  />
                </label>
                <label>
                  E-mail
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="maria@exemplo.com"
                    autoComplete="off"
                  />
                </label>
                <label>
                  Telefone
                  <input
                    type="tel"
                    name="telefone"
                    required
                    pattern="[0-9 \(\)\+\-]{10,20}"
                    placeholder="(42) 99999-0000"
                    title="Informe de 10 a 20 caracteres, usando números, espaços ou parênteses."
                    autoComplete="off"
                  />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <span className="stepNumber">2</span> Endereço
              </legend>
              <div className="formGrid">
                <label>
                  CEP
                  <input
                    name="cep"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{5}-?[0-9]{3}"
                    maxLength={9}
                    placeholder="85000-000"
                    title="Informe 8 números, com ou sem hífen."
                    autoComplete="off"
                  />
                </label>
                <label>
                  Estado
                  <select name="estado" required defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="fullField">
                  Rua ou avenida
                  <input
                    name="rua"
                    required
                    minLength={3}
                    placeholder="Ex.: Rua das Flores"
                    autoComplete="off"
                  />
                </label>
                <label>
                  Número
                  <input
                    name="numero"
                    required
                    placeholder="123 ou s/n"
                    autoComplete="off"
                  />
                </label>
                <label>
                  Complemento <span className="optional">(opcional)</span>
                  <input
                    name="complemento"
                    placeholder="Apartamento, bloco..."
                    autoComplete="off"
                  />
                </label>
                <label>
                  Bairro
                  <input
                    name="bairro"
                    required
                    placeholder="Centro"
                    autoComplete="off"
                  />
                </label>
                <label>
                  Cidade
                  <input
                    name="cidade"
                    required
                    placeholder="Guarapuava"
                    autoComplete="off"
                  />
                </label>
              </div>
            </fieldset>
            <div className="simulationOnly">
              <Icon name="check" width={20} height={20} />
              <p>
                Este botão apenas mostra a confirmação da simulação. Não há
                pagamento, cálculo de frete ou registro de pedido.
              </p>
            </div>
            <button className="primaryButton finalButton" type="submit">
              Concluir simulação <Icon name="arrow" width={20} height={20} />
            </button>
          </form>
          <OrderSummary checkout />
        </div>
      ) : (
        <EmptyState kind="cart" />
      )}
      <Modal
        open={confirmed}
        onClose={() => setConfirmed(false)}
        title="Simulação concluída"
        className="confirmationModal"
      >
        <span className="confirmationIcon">
          <Icon name="check" width={32} height={32} />
        </span>
        <span className="eyebrow">VOCÊ CONHECEU A EXPERIÊNCIA</span>
        <h2>Simulação concluída.</h2>
        <p>
          Esta é uma demonstração. Nenhum pedido ou pagamento será realizado.
        </p>
        <p className="muted">
          Nenhum dado foi enviado ou salvo. As peças continuam no seu carrinho
          para você explorar a proposta.
        </p>
        <button
          className="primaryButton"
          onClick={() => {
            setConfirmed(false);
            window.location.hash = "/catalogo";
          }}
        >
          Voltar para as peças <Icon name="arrow" width={18} height={18} />
        </button>
        <button className="textLink" onClick={() => setConfirmed(false)}>
          Revisar a simulação
        </button>
      </Modal>
    </section>
  );
}
