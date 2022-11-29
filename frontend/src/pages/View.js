import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import "./View.css";
import "./AddEdit.css";

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setUser({...resp.data[0]}))
    }, [id]);

    return (
        <div style={{marginTop:"100px"}}> 
            <div className="card">
                <div className="card-header">
                    <p>Informações do usuário</p>
                </div>
            </div>
            <div className="container">
                <strong>ID:</strong>
                <span>{id}</span>
                <br>
                </br>
                <strong>NOME:</strong>
                <span>{user.nome}</span>
                <br>
                </br>
                <strong>EMAIL:</strong>
                <span>{user.email}</span>
                <br>
                </br>
                <strong>Nº DE TELEFONE:</strong>
                <span>{user.telefone}</span>
                <br>
                </br>
                <strong>SENHA CRIPTOGRAFADA:</strong>
                <span>{user.senha}</span>
                <br>
                </br>
                <Link to="/">
                    <button className="btn-btn-back">Início</button>
                </Link>
            </div>

        </div>
    )
}

export default View