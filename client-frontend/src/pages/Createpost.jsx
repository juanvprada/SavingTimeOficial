import React, { useState } from 'react';
import { createPost } from '../services/services'; 
import logo from '../assets/logoSinFondo.webp'; // Asegúrate de que la ruta sea correcta

export const Create = ({ onCancel }) => { 
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [kindOfPost, setKindOfPost] = useState("");
    const [description, setDescription] = useState("");

    const handleChangesImages = (event) => {
        const archives = Array.from(event.target.files);
        if (archives.length > 10) {
            alert("Puedes subir hasta 10 imágenes.");
            return;
        }
        setImages(archives);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const newPost = {
            name: title,
            kindOfPost: kindOfPost,
            description: description,
            images: images.map(image => image.name)
        };
        // ======================================================
        // Llama a la función createPost desde services.jsx
        // ======================================================
        try {
            const respuesta = await createPost(newPost);
            if (respuesta.ok) {
                alert('Post guardado exitosamente');
                onCancel();
            } else {
                alert('Hubo un error al guardar el Post');
            }
        } catch (error) {
            console.error("Error al guardar el Post", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md m-5 relative z-10">
                {/* Encabezado con Logo */}
                <div className="flex justify-center mb-4">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-16 w-auto"
                    />
                </div>
                <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">Nuevo Post</h3>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <input 
                        type="text" 
                        id="title"  
                        placeholder="Nombre" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none"
                    />
                    <input 
                        type="text" 
                        id="kindOfPost" 
                        placeholder="Tipo de Post: receta, entrevista, etc" 
                        value={kindOfPost}
                        onChange={(e) => setKindOfPost(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none"
                    />
                    <textarea 
                        id="description" 
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none h-24 resize-none"
                    ></textarea>

                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleChangesImages}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100"
                    />

                    {images.length > 0 && (
                        <div className="w-full">
                            <h4 className="text-lg text-gray-800 my-2">Imágenes seleccionadas:</h4>
                            <ul className="list-none p-0">
                                {images.map((image, index) => (
                                    <li key={index} className="bg-gray-100 p-2 my-1 rounded-md text-sm text-gray-700">{image.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <input 
                        type="submit" 
                        id="save" 
                        value="Guardar" 
                        className="w-full p-3 text-lg font-bold bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition-colors"
                    />
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="w-full p-3 text-lg font-bold bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-colors"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};



