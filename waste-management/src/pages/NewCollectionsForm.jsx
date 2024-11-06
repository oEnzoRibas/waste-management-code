// src/pages/NewCollectionForm.js
import React from 'react';
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

const NewCollectionForm = () => {
    const handleSubmit = (values) => {
        axios.post('/api/collections', values)
            .then(() => alert('Coleta adicionada com sucesso!'))
            .catch((error) => console.error(error));
    };

    return (
        <Formik
            initialValues={{
                date: '',
                route: '',
                materials: '',
                weight: '',
                vehicle: '',
                documents: ''
            }}
            validationSchema={CollectionSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <Field name="date" type="date" placeholder="Data" />
                <ErrorMessage name="date" component="div" />
                {/* Outros campos aqui */}
                <button type="submit">Adicionar Coleta</button>
            </Form>
        </Formik>
    );
};

export default NewCollectionForm;
