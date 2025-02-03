import "./styles.css"; 
import { useState } from "react"; //useState -> mudar estado de uma constante
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Home from "../home";

export default function Login(){

  //const [teste, setTeste] = useState(0) //a "teste" é para mim poder usar, a "setTeste" é para mim poder alterar

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const logar = async()=>{
    try {
      const response = await axios.post( //ao logar, o token é guardado na response
        'http://127.0.0.1:8000/api/token/',
        {
          username: user,
          password: password
        }
      )

      console.log("TokenLogin ", response.data.access)
      localStorage.setItem('token', response.data.access)
      navigate('/home')
    } catch (error) {
      console.error(error)
    }
  }
  return(
    <div className="container">
      <h1>Login</h1>

      <input className="caixa"
      value={user} // o value deve sempre estar aqui
      onChange={(e) => {setUser(e.target.value)}}
      placeholder="User"
      />

      <input className="caixa"
      value={password}
      onChange={(e) => {setPassword(e.target.value)}}
      placeholder="Password"
      type="password"
      />

      <button className="btn" type="submit" onClick={logar}>  
        Entrar
      </button>
    </div>
  )
}