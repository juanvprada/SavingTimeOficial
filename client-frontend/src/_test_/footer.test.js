import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer.jsx';
import '@testing-library/jest-dom';
/* import userEvent from '@testing-library/user-event'; */
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
    test('render the Footer', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
    console.log(screen.debug());

      /* para verificar si los titulos estan en el DOM */
      expect(screen.getByText('Enlaces útiles')).toBeInTheDocument();
      expect(screen.getByText('Síguenos')).toBeInTheDocument();
      expect(screen.getByText(/© 2024 Bio Blog/i)).toBeInTheDocument(); /* esto es para saber si cambia */
    });
});