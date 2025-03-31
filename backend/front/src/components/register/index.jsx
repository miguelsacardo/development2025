import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles.css'


export function Register(){
    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    const registrar = async()=>{
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/usuarios',
                {
                    username: username,
                    email: email,
                    password: password
                }
            )
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="container">
            <h1>Cadastro</h1>

            <input type="text" 
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            placeholder="Username"
            />

            <input type="text" 
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder="Email"
            />

            <input type="text" 
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder="Senha"
            />

            <button className="btn" type="submit" onClick={registrar}>
                Cadastrar
            </button>
        </div>
    )
}