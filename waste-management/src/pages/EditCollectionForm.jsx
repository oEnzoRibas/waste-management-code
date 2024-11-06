// src/pages/EditCollectionForm.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const CollectionSchema = Yup.object().shape({
    date: Yup.date().required('Data é obrigatória'),
    route: Yup.string().required('Rota é obrigatória'),
    materials: Yup.string().required('Materiais são obrigatórios'),
    weight: Yup.number().required('Peso é obrigatório'),
    vehicle: Yup.string().required('Veículo é obrigatório'),
    documents: Yup.string().required('Documentos são obrigatórios')
});

const EditCollectionForm = () => {
    const { id } = useParams();
    //const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        date: '',
        route: '',
        materials: '',
        weight: '',
        vehicle: '',
        documents: ''
    });

    useEffect(() => {
        // Fetch existing collection data
        axios.get(`/api/collections/${id}`)
            .then(response => setInitialValues(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleSubmit = (values) => {
        axios.put(`/api/collections/${id}`, values)
            .then(() => {
                alert('Coleta atualizada com sucesso!');
                //navigate('/collections'); // Redireciona para a página de coletas
            })
            .catch((error) => console.error(error));
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={CollectionSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <Field name="date" type="date" />
                <ErrorMessage name="date" component="div" />
                {/* Adicione os outros campos aqui */}
                <button type="submit">Salvar Alterações</button>
            </Form>
        </Formik>
    );
};

export default EditCollectionForm;
