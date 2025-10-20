import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    nascimento: "",
    email: "",
    usuario: "",
    senha: "",
    cep: "",
    numero: "",
    endereco: "",
    telefone: ""
  });

  const [erros, setErros] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const regex = {
    nome: /^[A-Za-zÀ-ÿ\s]{3,}$/,
    nascimento: /^\d{2}\/\d{2}\/\d{4}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    usuario: /^[a-zA-Z0-9_]{3,16}$/,
    senha: /^.{8,}$/,
    cep: /^\d{8}$/,
    numero: /^\d+$/,
    endereco: /^[\wÀ-ÿ0-9\s,.\-\/#]+$/,
    telefone: /^\d{10,11}$/
  };

  // quando o input mudar, altera o set form e nao deixa os erros aparecerem
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    setErros(prev => ({ ...prev, [name]: undefined }));
    setSubmitted(false);
  };

  const validar = () => {
    let novosErros = {};
    for (let campo in regex) {

      if (!form[campo] || !regex[campo].test(form[campo])) {
        novosErros[campo] = mensagemErro(campo);
      }
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const mensagemErro = (campo) => {
    const msgs = {
      nome: "Nome inválido. Use apenas letras e no mínimo 3 caracteres.",
      nascimento: "Por favor, use o formado DIA/MES/ANO para a data.",
      email: "Email inválido.",
      usuario: "Usuário: 3-16 characteres, letras e números.",
      senha: "Por favor, informe uma senha com no mínimo 8 caracteres.",
      cep: "CEP deve conter 8 dígitos.",
      numero: "O número não pode ser vazio, deve ser inteiro e positivo, sem espaços, letras, símbolos ou sinais e deve conter pelo menos um dígito.",
      endereco: "O endereço não pode ser vazio, caracteres como !, @ ou $ não são permitidos.",
      telefone: "O telefone deve ter 10 ou 11 dígitos."
    };
    return msgs[campo] || "Campo inválido.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      setSubmitted(true);
      alert("Cadastro enviado com sucesso!");

      navigate("/inicio")
    } else {
      setSubmitted(false);
      // focus primeiro campo com erro
      const primeiro = Object.keys(erros)[0] || Object.keys(regex).find(k => !regex[k].test(form[k]) || !form[k]);
      const el = document.querySelector(`[name="${primeiro}"]`);
      if (el) el.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-8!"
        aria-labelledby="titulo-cadastro"
        noValidate
      >
        <h2 id="titulo-cadastro" className="text-white text-3xl font-pixel mb-2!">Cadastre-se</h2>

        <p className="text-gray-200 mb-6! font-defaultPixel text-3xl">Crie sua conta — rápido e seguro</p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {Object.keys(form).map((campo) => {
            const hasError = !!erros[campo];
            const errorId = hasError ? `${campo}-erro` : undefined;
            return (
              <div className="flex flex-col font-defaultPixel text-2xl" key={campo}>
                <label
                  htmlFor={campo}
                  className="mb-1! text-gray-300 font-medium"
                >
                  {campo.charAt(0).toUpperCase() + campo.slice(1)}
                </label>
                <input
                  id={campo}
                  name={campo}
                  type={campo === "senha" ? "password" : "text"}
                  value={form[campo]}
                  onChange={handleChange}
                  aria-label={campo}
                  aria-invalid={hasError ? "true" : "false"}
                  aria-describedby={errorId}
                  className={`rounded-md border-2 bg-gray-700 text-white px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${hasError ? 'border-red-500' : 'border-gray-600'}`}
                  inputMode={campo === "telefone" || campo === "cep" || campo === "numero" ? "numeric" : "text"}
                />
                {hasError && (
                  <span role="alert" id={errorId} className="mt-1! text-sm text-red-400 font-semibold">
                    {erros[campo]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="mt-8! w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:outline-none rounded-md text-white font-semibold py-3! transition-colors duration-200"
          aria-label="Enviar cadastro"
        >
          Enviar
        </button>

        <div aria-live="polite" className="sr-only">
          {submitted ? "Formulário enviado com sucesso" : ""}
        </div>
      </form>
    </div>

  );
}
