// src/pages/LoginPage.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { AuthContext } from '../context/AuthContext';
import '@testing-library/jest-dom/extend-expect';

test('renders login form and logs in user', async () => {
  const mockSetIsAuthenticated = jest.fn();
  render(
    <AuthContext.Provider value={{ setIsAuthenticated: mockSetIsAuthenticated }}>
      <LoginPage />
    </AuthContext.Provider>
  );

  // Verifique se os campos de input estão presentes
  const usernameInput = screen.getByLabelText(/usuário/i);
  const passwordInput = screen.getByLabelText(/senha/i);
  const loginButton = screen.getByRole('button', { name: /entrar/i });

  // Insira valores nos campos
  fireEvent.change(usernameInput, { target: { value: 'user' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  // Clique no botão de login
  fireEvent.click(loginButton);

  // Verifique se a função mockSetIsAuthenticated foi chamada
  expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
});

