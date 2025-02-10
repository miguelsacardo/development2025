import React, { useState } from "react";
import axios from "axios";

const ModalProfessores = ({ isOpen, onClose }) => {
  const handleInput = (event) => {
    setCreate({ ...create, [event.target.name]: event.target.value })
  }

  const criar = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/professores",
        create, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(response)
    } catch (error) {

    }

  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Cadastro de Professor</h2>
        <input type="text" placeholder="NI" value={create.ni} onChange={handleInput} name="ni" />
        <input type="text" placeholder="Nome" value={create.nome} onChange={handleInput} name="nome" />
        <input type="email" placeholder="Email" value={create.email} onChange={handleInput} name="email" />
        <input type="tel" placeholder="Celular" value={create.cel} onChange={handleInput} name="cel" />
        <input type="text" placeholder="Ocupação" value={create.ocup} onChange={handleInput} name="ocup" />
        <button type="submit" onClick={criar}>Salvar</button>
      </div>
    </div>
  );
};


export default ModalProfessores;