// Createpost.jsx
import React, { useState, useEffect } from 'react'; 
import { createPost, updatePost } from '../services/services'; 
import { logoImg } from '../utils';
import { useNavigate } from 'react-router-dom';

export const Create = ({ post, onSubmit, onCancel }) => { 
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [kindOfPost, setKindOfPost] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    // Cargar los datos del post en caso de editar
    useEffect(() => {
        if (post) {
            setTitle(post.name || ""); 
            setKindOfPost(post.kindOfPost || "");
            setDescription(post.description || "");
            setImage(null); 
        }
    }, [post]);

    // Manejar cambio de imagen
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0]; 
        if (!selectedImage) {
            alert("Debes seleccionar una imagen.");
            return;
        }
        setImage(selectedImage);
    };

    // Manejar el submit del formulario (crear/editar)
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!title || !kindOfPost || !description) {
            alert("Por favor, completa todos los campos.");
            return;
        }
    
        // Enviar los datos como JSON
        const updatedPost = {
            name: title,
            kindOfPost: kindOfPost,
            description: description,
            image: image ? image : post?.image || null  // Usa la imagen existente si no se selecciona una nueva
        };
    
        try {
            await onSubmit(updatedPost);  // Llama a onSubmit con el objeto JSON
        } catch (error) {
            console.error("Error al procesar el Post:", error);
        }
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md m-5 relative z-10">
                <div className="flex justify-center mb-4">
                    <img 
                        src={logoImg} 
                        alt="Logo" 
                        className="h-16 w-auto"
                    />
                </div>
                <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">
                    {post ? 'Editar Post' : 'Nuevo Post'}
                </h3>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
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
                        value={post ? "Actualizar" : "Crear"} 
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








