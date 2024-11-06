// src/pages/LoginPage.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    //const navigate = useNavigate();

    const [inputValues, setInputValues] = useState({username:'',password:''});

    const validationSchema = Yup.object({
        username: Yup.string().required('Usuário é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log({username: inputValues.username,password: inputValues.password});

        


        fetch('http://localhost:2000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: inputValues.username,password: inputValues.password}),
            
        })
        
        // axios.post('http://localhost:2000/api/auth/login', {username: inputValues.username,password: inputValues.password} )
            .then((response) => {
                console.log(response.data.token);
                console.log("response.data.token");
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token);
                console.log("response.data.token 2");
                setIsAuthenticated(true);
                //navigate('/collections');
                console.log('cert');
            })
            .catch((error) => {
                console.log('CATHCHHCAHSDJAS');
                console.log(error);
                alert('Login falhou: Verifique suas credenciais');
                alert(error);
            })
    };


    return (
        <div>
            <h2>Login</h2>
            <div>
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
