// src/pages/CollectionsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CollectionsPage = () => {
    const [collections, setCollections] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [collectionToDelete, setCollectionToDelete] = useState(null);

    useEffect(() => {
        axios.get('/api/collections')
            .then(response => setCollections(response.data))
            .catch(error => console.error(error));
    }, []);

    const openModal = (id) => {
        setShowModal(true);
        setCollectionToDelete(id);
    };

    const closeModal = () => {
        setShowModal(false);
        setCollectionToDelete(null);
    };

    const handleDelete = () => {
        axios.delete(`/api/collections/${collectionToDelete}`)
            .then(() => {
                setCollections(collections.filter(c => c.id !== collectionToDelete));
                closeModal();
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Coleta de Resíduos</h2>
            <Link to="/collections/new">Adicionar Nova Coleta</Link>
            <ul>
                {collections.map((collection) => (
                    <li key={collection.id}>
                        {collection.date} - {collection.route}
                        <Link to={`/collections/${collection.id}/edit`}>Editar</Link>
                        <button onClick={() => openModal(collection.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Confirmar Exclusão</h4>
                        <p>Tem certeza de que deseja excluir esta coleta?</p>
                        <button onClick={handleDelete}>Sim</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectionsPage;
