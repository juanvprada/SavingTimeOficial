import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
// import { logoImg } from '../utils';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <section className="max-w-full sm:max-w-md mx-auto p-4 bg-transparent rounded-lg shadow-md mt-6 overflow-y-auto">
            <div className="text-center mb-6">
                {/* <img src={logoImg} alt="Logo" className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4" /> */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-customGreen">
                    {isLogin ? 'Iniciar Sesión' : 'Registro de Usuario'}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
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
            <footer className="mt-4 text-center text-sm text-gray-400">
                <p>Al registrarte, aceptas nuestros{' '}
                    <a href="#" className="text-green-500 underline hover:text-green-300">
                        Términos y Condiciones
                    </a>
                    {' '} y la{' '}
                    <a href="#" className="text-green-500 underline hover:text-green-300">
                        Política de Privacidad
                    </a>.
                </p>
            </footer>
        </section>
    );
};

export default AuthForm;

