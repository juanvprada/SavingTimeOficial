import React, { useState } from "react";

const ContactForm = ({ submittedMessages, setSubmittedMessages }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessages([...submittedMessages, { name, email, message }]);
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleDeleteMessage = (index) => {
    const newMessages = submittedMessages.filter(
      (_, msgIndex) => msgIndex !== index
    );
    setSubmittedMessages(newMessages);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-green-600 text-center">
        <span className="text-green-800">Bio</span>{" "}
        <span className="text-green-600">Blog</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-green-600"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-green-600"
          >
            Correo Electrónico (opcional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-green-600"
          >
            Mensaje (máx. 150 caracteres)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="150"
            required
            className="mt-1 block w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-colors"
        >
          Enviar
        </button>
      </form>

      {/* Mostrar mensajes enviados */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-green-600 text-center">
          Opiniones recibidas:
        </h3>
        <ul>
          {submittedMessages.map((msg, index) => (
            <li
              key={index}
              className="border border-green-200 rounded-md p-2 mt-2 bg-gray-50"
            >
              <strong className="text-green-800">{msg.name}:</strong>{" "}
              {msg.message}
              <button
                onClick={() => handleDeleteMessage(index)}
                className="ml-2 text-red-500"
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactForm;
