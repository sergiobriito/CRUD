import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import "./AddEdit.css";

const initialState = {
    nome: "",
    email: "",
    telefone: "",
    senha: ""
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {nome, email, telefone, senha} = state;
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`https://crud-her3.onrender.com/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!nome || !email || !telefone || !senha){
            toast.error("Favor preencher todos os campos");
        } else {
            if(!id){
                axios.post("https://crud-her3.onrender.com/api/post", {
                nome,
                email,
                telefone,
                senha
            }).then(() => {
                setState({nome:"", email: "", telefone: "", senha: ""})
            }).catch((err) => toast.error(err.response.data));
            toast.success("Usuário adicionado com sucesso");
            setTimeout(() => navigate("/"), 500);
            }else{
                axios.put(`https://crud-her3.onrender.com/api/update/${id}`, {
                nome,
                email,
                telefone,
                senha
            }).then(() => {
                setState({nome:"", email: "", telefone: "", senha: ""})
            }).catch((err) => toast.error(err.response.data));
            toast.success("Usuário atualizado com sucesso");
            setTimeout(() => navigate("/"), 500);
            }      
        }
    };

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state,[name]: value});
    };

    return (
        <div style={{marginTop:"100px"}}>
            <form className="form-style-6"
            onSubmit = {handleSubmit}
            >
                <label htmlFor= "nome">Nome</label>
                <input type= "text" id="nome" name="nome" placeHolder="Nome..." value={nome || ""}
                onChange= {handleInputChange}
                />

                <label htmlFor= "email">Email</label>
                <input type= "email" id="email" name="email" placeHolder="Email..." value={email || ""}
                onChange= {handleInputChange}
                />

                <label htmlFor= "telefone">Nº de Telefone</label>
                <input type= "number" id="telefone" name="telefone" placeHolder="Nº de telefone ..." value={telefone || ""}
                onChange= {handleInputChange}
                />

                <label htmlFor= "senha">Senha</label>
                <input type="password" id="senha" name="senha" placeHolder="Senha ..." value={senha || ""}
                onChange= {handleInputChange}
                />

                <input type="submit" value={id ? "Atualizar" : "Salvar"}/>
                <Link to= "/">
                    <input type="button" value="Início" className="form-style-6-btn-back"/>
                </Link>
            </form>
        </div>
    )
}
export default AddEdit