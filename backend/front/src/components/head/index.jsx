import React from "react";
import './styles.css'
import { Link } from "react-router"

export default function Head(){
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
            </div>
        </div>
    )
}