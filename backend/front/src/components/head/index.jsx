import React from "react";
import './styles.css'
import { Link } from "react-router"
import { useNavigate } from "react-router-dom";

export default function Head(){
    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem('token')
        navigate("/login")
    }
    return(
        <div className="container_head">
            <div className="title">
                <h2>Professores</h2>
            </div>
            <div className="nav">
                <span>Create</span>
                <span>Read</span>
                <span>Update</span>
                <span>Delete</span>
                <span><Link to="/subjects">Ir para o CRUD de disciplinas</Link></span>
                <span><button onClick={logout}>Logout</button></span>
            </div>
        </div>
    )
}