import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
// import { logoImg } from '../utils';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <section className="max-w-full sm:max-w-md mx-auto p-4 bg-transparent rounded-lg shadow-md mt-6 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
                {/* <img src={logoImg} alt="Logo" className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4" /> */}
                <h2 className="text-xl text-green-400 sm:text-2xl font-semibold text-customGreen">
                    {isLogin ? 'Iniciar Sesión' : 'Registro de Usuario'}
                </h2>
                <p className="text-white">
                    {isLogin ? 'Accede a tu cuenta para continuar.' : 'Crea una cuenta para acceder a contenido exclusivo.'}
                </p>
            </div>

            {/* Botones para alternar entre Login y Registro */}
            <div className="flex justify-center mb-4">
    <button
        onClick={() => setIsLogin(true)}
        className={`w-44 py-2 text-center rounded mx-2 ${isLogin ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'}`}
    >
        Iniciar Sesión
    </button>
    <button
        onClick={() => setIsLogin(false)}
        className={`w-44 py-2 text-center rounded mx-2 ${!isLogin ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'}`}
    >
        Registrarse
    </button>
</div>



            {/* Renderizar el formulario de inicio de sesión o registro */}
            <div className="space-y-4">
                {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
        </section>
    );
};

export default AuthForm;

