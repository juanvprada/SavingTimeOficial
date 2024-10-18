import React, { useState } from 'react';
import { createPost } from '../services/services'; 
import logo from '../assets/logoSinFondo.webp'; 

export const Create = ({ onCancel }) => { 
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [kindOfPost, setKindOfPost] = useState("");
    const [description, setDescription] = useState("");

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0]; 
        if (!selectedImage) {
            alert("Debes seleccionar una imagen.");
            return;
        }
        setImage(selectedImage);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (!title || !kindOfPost || !description) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const newPost = {
            name: title,
            kindOfPost: kindOfPost,
            description: description,
            image: image ? image.name : null 
        };

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
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100"
                    />

                    {image && (
                        <div className="w-full">
                            <h4 className="text-lg text-gray-800 my-2">Imagen seleccionada:</h4>
                            <p className="bg-gray-100 p-2 my-1 rounded-md text-sm text-gray-700">{image.name}</p>
                            <img src={URL.createObjectURL(image)} alt="Previsualización" className="max-w-full h-auto mt-2" />
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




