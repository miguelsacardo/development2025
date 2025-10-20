import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cadastro from "../Paginas/Cadastro";

describe("teste para tela de cadastro - garante que nao haja inconsistencias no cadastro do usuário", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );
  });

  // verifica se o título é renderizado na tela.
  // o trecho <h2 id="titulo-cadastro" className="text-white text-3xl font-pixel mb-2!">Cadastre-se</h2>
  // deve manter o "cadastre-se", caso não, vai falhar.
  it("renderiza o título do formulário", () => {
    expect(screen.getByText(/cadastre-se/i)).not.toBeNull();
  });


  // verifica se o botão de "enviar" é renderizado na tela.
  // <button>enviar</button>, caso não, o teste falha
  it("renderiza o botão enviar", () => {
    expect(screen.getByRole("button", { name: /enviar/i })).not.toBeNull();
  });

  // seleciona todos os elementos do dom que tem a role "textbox" (input, textarea, etc)
  it("inicialmente os campos estão vazios", () => {
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => {
      expect(input.value).toBe(""); // percorre todos os inputs encontrados e verifica se cada um está vazio
    });
    // srenha é do tipo password, entao seleciona com aria ao inves do get all by role
    const senha = screen.getByLabelText(/senha/i);
    expect(senha.value).toBe(""); // verifica se o campo senha tamvém começa vazio
  });

  // verifica se é possivel escrever no campo nome
  it("testa escrita no campo nome", () => {
    const nome = screen.getByLabelText(/nome/i);
    fireEvent.change(nome, { target: { value: "miguel" } });
    expect(nome.value).toBe("miguel");
  });

  // verifica se é posivel escrever no campo email
  it("testa escrita no campo email", () => {
    const email = screen.getByLabelText(/email/i);
    fireEvent.change(email, { target: { value: "teste@teste.com" } });
    expect(email.value).toBe("teste@teste.com");
  });

  // mensagem para nome inválido ao submeter
  it("erro de nome inválido após submit", () => {
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/nome inválido. Use apenas letras e no mínimo 3 caracteres./i)).not.toBeNull();
  });

  // caso o nome seja valido, ao submeter, nenhum erro aparece
  it("se digitar o valor correto no nome, nao mostra erro", () => {
    const nome = screen.getByLabelText(/nome/i);
    fireEvent.change(nome, { target: { value: "Maria" } });

    // acha o botao de submit e simula o click nele
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/nome inválido. Use apenas letras e no mínimo 3 caracteres./i)).toBeNull();
  });

  // verifica se o erro de email inválido é disparado caso o campo esteja vazio
  it("erro de email invalido caso campo vazio", () => {
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/email inválido/i)).not.toBeNull();
  });

  // verifica se a mensagem de erro é nula caso o email seja válido
  it("erro não aparece ao digitar email válido", () => {
    const email = screen.getByLabelText(/email/i);
    fireEvent.change(email, { target: { value: "teste@teste.com" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/email inválido/i)).toBeNull();
  });

  it("verifica se a mensagem de erro aparece se a senha não ter no mínimo 8 caracteres", () => {
    const senha = screen.getByLabelText(/senha/i);
    fireEvent.change(senha, { target: { value: "123" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/por favor, informe uma senha com no mínimo 8 caracteres./i)).not.toBeNull();
  });

  // verifica se a mensagem de erro é nula caso a senha seja válida
  it("erro não aparece ao digitar senha válida", () => {
    const senha = screen.getByLabelText(/senha/i);
    fireEvent.change(senha, { target: { value: "12345678" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/por favor, informe uma senha com no mínimo 8 caracteres./i)).toBeNull();
  });

  it("verifica se a mensgaem de erro aparece ao digitar um cep inválido", () => {
    const cep = screen.getByLabelText(/cep/i);
    fireEvent.change(cep, { target: { value: "1234" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/cep deve conter 8 dígitos/i)).not.toBeNull();
  });

  // verifica se a mensagem de erro é nula caso o cep seja válido
  it("erro não aparece ao digitar o cep válido", () => {
    const cep = screen.getByLabelText(/cep/i);
    fireEvent.change(cep, { target: { value: "12345678" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/cep deve conter 8 dígitos/i)).toBeNull();
  });

  it("verifica se a mensagem de erro aparece ao digitar um número inválido", () => {
    const numero = screen.getByLabelText(/numero/i);
    fireEvent.change(numero, { target: { value: "abc" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/o número não pode ser vazio, deve ser inteiro e positivo, sem espaços, letras, símbolos ou sinais e deve conter pelo menos um dígito./i)).not.toBeNull();
  });

  // verifica se a mensagem de erro é nula caso o numero seja válido
  it("erro não aparece ao digitar número válido", () => {
    const numero = screen.getByLabelText(/numero/i);
    fireEvent.change(numero, { target: { value: "123" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/o número não pode ser vazio, deve ser inteiro e positivo, sem espaços, letras, símbolos ou sinais e deve conter pelo menos um dígito./i)).toBeNull();
  });

  it("verifica se a mensagem de erro aparece ao digitar um telefone inválido", () => {
    const tel = screen.getByLabelText(/telefone/i);
    fireEvent.change(tel, { target: { value: "123" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/o telefone deve ter 10 ou 11 dígitos./i)).not.toBeNull();
  });

  // verifica se a mensagem de erro é nula caso digite um telefone válido
  it("erro não aparece ao digitar telefone válido", () => {
    const tel = screen.getByLabelText(/telefone/i);
    fireEvent.change(tel, { target: { value: "11999999999" } });
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);
    expect(screen.queryByText(/o telefone deve ter 10 ou 11 dígitos./i)).toBeNull();
  });

  it("verifica se os campos com erro possuem o aria-invalid = true", () => {
    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);

    const campos = [
      "nome", "nascimento", "email", "usuario",
      "senha", "cep", "numero", "endereco", "telefone"
    ];

    campos.forEach(campo => {
      const input = screen.getByLabelText(new RegExp(campo, "i"));
      expect(input.getAttribute("aria-invalid")).toBe("true");
    });
  });

  it("teste do formulário completo com todos os valores válidos", () => {
    // todos os campos possuem valores válidos
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: "miguel" } });
    fireEvent.change(screen.getByLabelText(/nascimento/i), { target: { value: "01/01/2000" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "teste@teste.com" } });
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: "miguel123" } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/cep/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/numero/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/endereco/i), { target: { value: "Rua teste, 123" } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: "11999999999" } });

    // versão mockada do alert, um "alert fake"
    window.alert = vi.fn();

    const botao = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(botao);

    expect(window.alert).toHaveBeenCalledWith("Cadastro enviado com sucesso!");
  });

  // verifica se ao digitar um email sem @, o erro também é disparado
  it("erro disparado quando email não tem @", () => {

    const emailInput = screen.getByLabelText(/email/i);
    const botao = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(emailInput, { target: { value: "emailsemarroba.com" } });

    fireEvent.click(botao);

    expect(screen.queryByText(/email inválido/i)).not.toBeNull();
  });
});
