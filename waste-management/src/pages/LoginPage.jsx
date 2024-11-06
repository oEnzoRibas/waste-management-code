// src/pages/LoginPage.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    //const navigate = useNavigate();

    const [inputValues, setInputValues] = useState({username:'',password:''});

    const validationSchema = Yup.object({
        username: Yup.string().required('Usuário é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
    });

    const handleSubmit = () => {
        axios.post('/api/auth/login', {username: inputValues.username,password: inputValues.password} )
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
                //navigate('/collections');
                console.log('cert');
            })
            .catch((error) => {
                alert('Login falhou: Verifique suas credenciais');
                console.log('CATHCHHCAHSDJAS');
            })
    };

    return (
        <div>
            <h2>Login</h2>
            <div
            >
                 
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Usuário</label>
                            <input type="text" name="username" onChange={e => setInputValues((state) => ({...state,username:e.target.value}))} value={inputValues.username} />
                           
                        </div>
                        <div>
                            <label>Senha</label>
                            <input type="password" name="password" onChange={e => setInputValues((state) => ({...state,password:e.target.value}))} value={inputValues.password} />
                
                        </div>
                        <button type="submit" >Entrar</button>
                    </form>
                
            </div>
        </div>
    );
};

export default LoginPage;
