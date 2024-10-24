import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar.jsx'; 
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Navbar', () => {
    test('verifies the navigation links', async () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
  
      const user = userEvent.setup();
  
      /* Verifico si los enlaces están presentes en el DOM */
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Nosotros')).toBeInTheDocument();
      expect(screen.getByText('Contacto')).toBeInTheDocument();
  
      /* Simulo el clic en el enlace "Blog" y verifico la ruta (ejemplo) */
      const blogLink = screen.getByText('Blog').closest('a');
      expect(blogLink).toHaveAttribute('href', '/blog');
  
      await user.click(blogLink);
  
    });


});  