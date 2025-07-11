/**
 * @vitest-environment jsdom
 */

import { render, fireEvent, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import DefaultLayout from '../../../../../pages/interface/components/DefaultLayout/index.js';

// Mock do next/router para controlar e verificar as chamadas de navegação
const mockRouterPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockRouterPush,
      pathname: '/',
      query: '',
      asPath: '/',
    };
  },
}));

// Mock de componentes filhos para focar o teste apenas no DefaultLayout
vi.mock('@/TabNewsUI', () => ({
  // Extraímos `maxWidth` para que não seja passado para a div, resolvendo o aviso do React.
  Box: ({ children, maxWidth, ...props }) => <div {...props}>{children}</div>,
  Header: () => <header id="header">Header</header>,
  Footer: () => <footer>Footer</footer>,
}));
vi.mock('pages/interface', () => ({
  Head: () => <head />,
}));
vi.mock('@tabnews/ui', () => ({
  GoToTopButton: () => <button>Go to Top</button>,
}));

describe('DefaultLayout Keyboard Shortcuts', () => {
  // Limpa os mocks antes de cada teste para garantir a independência
  beforeEach(() => {
    mockRouterPush.mockClear();
  });

  // Limpa o DOM e os espiões após cada teste para garantir a independência
  afterEach(() => {
    const searchButton = document.getElementById('search-icon-button');
    if (searchButton) {
      document.body.removeChild(searchButton);
    }
    vi.restoreAllMocks();
  });

  it('should navigate to /publicar when "n" key is pressed', () => {
    render(<DefaultLayout />);

    // Dispara o evento de teclado no nível da janela (window)
    fireEvent.keyDown(window, { key: 'n' });

    expect(mockRouterPush).toHaveBeenCalledWith('/publicar');
  });

  it('should click on search button when "/" key is pressed', () => {

    // botão falso no DOM para que o `querySelector` o encontre.
    const searchButton = document.createElement('button');
    searchButton.id = 'search-icon-button';
    document.body.appendChild(searchButton);

    // observar se o método `click` é chamado.
    const clickSpy = vi.spyOn(searchButton, 'click');

    render(<DefaultLayout />);

    // 2. Ação (Action)
    // Dispara o evento de pressionar a tecla "/"
    fireEvent.keyDown(window, { key: '/' });

    // 3. Verificação (Assertion)
    // Verifica se o (clickSpy) foi chamado exatamente uma vez.
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
