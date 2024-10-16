import React, { useState } from 'react';
import { createPost } from '../services/services'; 

export const Create = ({ onCancel }) => { 
    const [imagenes, setImagenes] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleChangesImages = (event) => {
        const archivos = Array.from(event.target.files);
        if (archivos.length > 10) {
            alert("Puedes subir hasta 10 imágenes.");
            return;
        }
        setImagenes(archivos);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const newPost = {
            name: titulo,
            direction: direccion,
            description: descripcion,
            images: imagenes.map(imagen => imagen.name)
        };
        // ======================================================
        // Llama a la función createPost desde services.jsx
        // ======================================================
        try {
            const respuesta = await createPost(newPost);
            if (respuesta.ok) {
                alert('EPost guardado exitosamente');
                onCancel();
            } else {
                alert('Hubo un error al guardar el Post');
            }
        } catch (error) {
            console.error("Error al guardar el Post", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md box-border m-5">
                <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">Nuevo Post</h3>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <input 
                        type="text" 
                        id="title" 
                        placeholder="Nombre" 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)} 
                        className="w-full max-w-md p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none"
                    />
                    <input 
                        type="text" 
                        id="direction" 
                        placeholder="Lo que queramos" 
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)} 
                        className="w-full max-w-md p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none"
                    />
                    <textarea 
                        id="description" 
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full max-w-md p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none h-24 resize-none"
                    ></textarea>

                    <input
                        type="file"
                        id="imagenes"
                        accept="image/*"
                        multiple
                        onChange={handleChangesImages}
                        className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md bg-gray-100"
                    />

                    {imagenes.length > 0 && (
                        <div className="w-full max-w-md">
                            <h4 className="text-lg text-gray-800 my-2">Imágenes seleccionadas:</h4>
                            <ul className="list-none p-0">
                                {imagenes.map((imagen, index) => (
                                    <li key={index} className="bg-gray-100 p-2 my-1 rounded-md text-sm text-gray-700">{imagen.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <input 
                        type="submit" 
                        id="save" 
                        value="Guardar" 
                        className="w-full max-w-md p-3 text-lg font-bold bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition-colors"
                    />
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="w-full max-w-md p-3 text-lg font-bold bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-colors"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

