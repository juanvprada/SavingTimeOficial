import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../services/services';
import { logoImg } from '../utils';
import { useNavigate } from 'react-router-dom';

export const Create = ({ post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState("");
    const [kindOfPost, setKindOfPost] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setTitle(post.name || "");
            setKindOfPost(post.kindOfPost || "");
            setDescription(post.description || "");
        }
    }, [post]);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage && selectedImage.size > 5 * 1024 * 1024) {
            alert("La imagen debe ser menor de 5MB.");
            return;
        }
        setImage(selectedImage);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('name', title);
        formData.append('kindOfPost', kindOfPost);
        formData.append('description', description);
        
        // Solo añade la imagen si está presente en el estado
        if (image) {
            formData.append('image', image);
        } else if (post?.image) {
            formData.append('image', post.image);
        }
    
        try {
            const newPost = post
                ? await updatePost(post.id, formData)
                : await createPost(formData);
            alert(`Post ${post ? "actualizado" : "creado"} exitosamente`);
            onSubmit(newPost);
            onCancel();
            navigate('/blog');
        } catch (error) {
            setError('Hubo un error al procesar el Post: ' + error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md m-5 relative z-10">
                <div className="flex justify-center mb-4">
                    <img src={logoImg} alt="Logo" className="h-16 w-auto" />
                </div>
                <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">{post ? 'Editar Post' : 'Nuevo Post'}</h3>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <input type="text" id="title" placeholder="Nombre" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none" required />
                    <input type="text" id="kindOfPost" placeholder="Tipo de Post" value={kindOfPost} onChange={(e) => setKindOfPost(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none" required />
                    <textarea id="description" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-lg focus:border-green-500 focus:outline-none h-24 resize-none" required></textarea>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-100" />
                    {image && <img src={URL.createObjectURL(image)} alt="Previsualización" className="max-w-full h-auto mt-2" />}
                    <input type="submit" id="save" value={post ? "Actualizar" : "Crear"} className="w-full p-3 text-lg font-bold bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition-colors" />
                    <button type="button" onClick={onCancel} className="w-full p-3 text-lg font-bold bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-colors">Cancelar</button>
                </form>
            </div>
        </div>
    );
};









