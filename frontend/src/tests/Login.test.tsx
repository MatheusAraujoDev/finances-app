/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import i18next from 'i18next';
import mockRouter from 'next-router-mock';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../i18n/translations/en/en.json';
import ptTranslation from '../i18n/translations/pt/pt.json';
import Login from '../pages/index';

jest.mock('next/router', () => require('next-router-mock'));
mockRouter.push("/");

i18next.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    pt: ptTranslation,
    en: enTranslation,
  }
})

describe('1. LOGIN', () => {
  test('Verifica se o título "Login" aparece na tela', () => {

    const { getByRole } = render(<Login />);
    const title = getByRole('heading', { level: 1 });
  
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Login/i)
  });

  test('Verifica se o componente "Account Form" aparece na tela', () => {
    const { getByTestId } = render(<Login />);
    const accForm = getByTestId("account-form");
  
    expect(accForm).toBeInTheDocument();
  });

  test('Verifica se aparecem os botões de selecionar Idioma aparece na tela', () => {

    const { getByRole } = render(<Login />);
    const brButton = getByRole('button', { name: /Pt-BR/i });
    const enButton = getByRole('button', { name: /En-US/i });
  
    expect(brButton).toBeInTheDocument();
    expect(enButton).toBeInTheDocument();
  });
})