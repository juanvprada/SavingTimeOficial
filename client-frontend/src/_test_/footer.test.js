import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer.jsx';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
    test('render the Footer', () => {
      render(<Footer />);
  
      /* para verificar si los titulos estan en el DOM */
      expect(screen.getByText('Acerca de nosotros')).toBeInTheDocument();
      expect(screen.getByText('Enlaces útiles')).toBeInTheDocument();
      expect(screen.getByText('Síguenos')).toBeInTheDocument();
      expect(screen.getByText(/© 2024 Bio Blog/i)).toBeInTheDocument(); /* esto es para saber si cambia */
    });
  

  test('navigates to correct page when clicking links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    /* Simula clic en un enlace */
    const aboutLink = screen.getByText('Acerca de nosotros');
    userEvent.click(aboutLink);

   /*  Verifica si después del clic cambia la URL */
    expect(window.location.pathname).toBe('/about');    /* Cambia '/about' por la ruta correcta esperada */
  });
});