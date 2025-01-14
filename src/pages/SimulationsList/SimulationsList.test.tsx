import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SimulationsList } from './SimulationsList';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';

jest.mock('../../hooks/useLocalStorage/useLocalStorage');

describe('SimulationsList', () => {
  const mockGetValue = jest.fn();
  const mockRemoveItem = jest.fn();

  beforeEach(() => {
    (useLocalStorage as jest.Mock).mockReturnValue({
      getValue: mockGetValue,
      removeItem: mockRemoveItem,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no simulations are present', () => {
    mockGetValue.mockReturnValue(null);

    render(<SimulationsList />);

    expect(screen.getByText('A lista está vazia!')).toBeInTheDocument();
  });

  test('renders company simulations when present', () => {
    mockGetValue.mockReturnValue({
      companies: [
        {
          company: {
            companyName: 'Company A',
            cnpj: '123456',
            monthlyRevenue: '10000',
          },
          credit_result: { status: 'Approved', max_amount: '50000' },
        },
      ],
    });

    render(<SimulationsList />);

    expect(screen.getByText('Pessoas jurídicas')).toBeInTheDocument();
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('R$ 50000,00')).toBeInTheDocument();
  });

  test('renders person simulations when present', () => {
    mockGetValue.mockReturnValue({
      persons: [
        {
          person: { name: 'Person A', cpf: '654321', monthlyIncome: '5000' },
          credit_result: { status: 'Pending', max_amount: '20000' },
        },
      ],
    });

    render(<SimulationsList />);

    expect(screen.getByText('Pessoas físicas')).toBeInTheDocument();
    expect(screen.getByText('Person A')).toBeInTheDocument();
    expect(screen.getByText('654321')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('R$ 20000,00')).toBeInTheDocument();
  });

  test('handles delete simulations', () => {
    mockGetValue.mockReturnValue({
      companies: [
        {
          company: {
            companyName: 'Company A',
            cnpj: '123456',
            monthlyRevenue: '10000',
          },
          credit_result: { status: 'Approved', max_amount: '50000' },
        },
      ],
      persons: [
        {
          person: { name: 'Person A', cpf: '654321', monthlyIncome: '5000' },
          credit_result: { status: 'Pending', max_amount: '20000' },
        },
      ],
    });

    render(<SimulationsList />);

    const deleteButton = screen.getByText('Limpar simulações');
    fireEvent.click(deleteButton);

    expect(mockRemoveItem).toHaveBeenCalledTimes(3);
  });
});
