import React from "react";
import './styles.css'

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
            </div>
        </div>
    )
}