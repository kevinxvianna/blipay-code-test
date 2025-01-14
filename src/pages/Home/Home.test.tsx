import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Home Page', () => {
  it('should render the content', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(
        'Apoio financeiro para quem busca crescer de forma sustentável',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Essas são algumas soluções disponíveis para você'),
    ).toBeInTheDocument();
  });

  it('should render the ProductCardGrid component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('product-card-grid')).toBeInTheDocument();
  });
});
