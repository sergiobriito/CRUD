import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
        document.title = "CRUD";
    }, []);

    const deleteUser = (id) => {
        if(
            window.confirm("Tem certeza que deseja remover o usuário ?")
        ){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Usuário removido com sucesso");
            setTimeout(() => loadData(), 500);
        }
    }; 

    const viewUser = (id,senha) => {
        const md5 = require('md5');
        if(
            md5(window.prompt("Informe a senha do usuário:")) === senha
        ){ 
            setTimeout(() => navigate(`/visualizar-usuario/${id}`), 500);
        }else{
            toast.error("Senha incorreta");
        }
    };

    return (
        <>
        <div className="Title"><h1>CRUD (Create, Read, Update, Delete)</h1></div>
        <div style={{ marginTop: "30px" }}>
            <Link to='/adicionar-usuario'>
                <button className="btn-btn-contact">Adicionar usuário</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Nº</th>
                        <th style={{ textAlign: 'center' }}>Nome</th>
                        <th style={{ textAlign: 'center' }}>Email</th>
                        <th style={{ textAlign: 'center' }}>Nº de Telefone</th>
                        <th style={{ textAlign: 'center' }}>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.nome}</td>
                                <td>{item.email}</td>
                                <td>{item.telefone}</td>
                                <td>
                                    <Link to={`/atualizar-usuario/${item.id}`}>
                                        <button className="btn-btn-edit">Editar</button>
                                    </Link>
                                    <button className="btn-btn-delete" onClick={() => deleteUser(item.id)}>Excluir</button>
                                    <button className="btn-btn-view" onClick={() => viewUser(item.id,item.senha)}>Visualizar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <div id="Linkedin" style={{marginTop:'330px',marginLeft:'300px',display: 'flex',alignItems:'center'}} data-locale="pt_BR" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="sérgio--brito" data-version="v1">
            <a href="https://br.linkedin.com/in/s%C3%A9rgio--brito?trk=profile-badge">
                <img src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" alt="Linkedin" style={{width:'42px',height:'42px'}}/>
            </a>
            <a id="desenvolvidoPor">Desenvolvido por Sérgio Brito</a>
        </div>
        </>
    )

}

export default Home;