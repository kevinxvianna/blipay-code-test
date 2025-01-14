import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AcquisitionForm } from './AcquisitionForm';
import '@testing-library/jest-dom';
import { useSetLoanSimulations } from '../../hooks/useSetLoanSimulations/useSetLoanSimulations';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../../hooks/useSetLoanSimulations/useSetLoanSimulations');

describe('AcquisitionForm', () => {
  const mockGetValue = jest.fn();
  const mockRemoveItem = jest.fn();

  beforeEach(() => {
    (useSetLoanSimulations as jest.Mock).mockReturnValue({
      getValue: mockGetValue,
      removeItem: mockRemoveItem,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Person form when pathname includes "person"', () => {
    mockGetValue.mockReturnValue(null);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/person',
      },
      writable: true,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AcquisitionForm />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole('textbox', { name: /Nome completo/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /CPF/i })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /Cidade/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /Renda mensal/i }),
    ).toBeInTheDocument();
  });

  it('does not render any form when pathname does not include "person" or "company"', () => {
    mockGetValue.mockReturnValue(null);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/other',
      },
      writable: true,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AcquisitionForm />
      </QueryClientProvider>,
    );

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
  });

  it('renders Company form when pathname includes "company"', () => {
    mockGetValue.mockReturnValue(null);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/company',
      },
      writable: true,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AcquisitionForm />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole('textbox', { name: /Razão social/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /Faturamento mensal/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /Cidade/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /CNPJ/i })).toBeInTheDocument();
  });

  it('renders SimulationResult when simulation data is available', () => {
    mockGetValue.mockReturnValue({
      person: {
        name: 'Kevin',
        cpf: '55555555555',
        age: '22',
        monthlyIncome: '5000',
        city: 'Campinas',
      },
      credit_result: {
        status: 'APPROVED',
        max_amount: '5000',
      },
    });
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/person',
      },
      writable: true,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AcquisitionForm />
      </QueryClientProvider>,
    );

    expect(
      screen.getByText('Sua solicitação foi', {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Fazer outra simulação/i }),
    ).toBeInTheDocument();
  });

  it('calls removeItem when clearSimulation is triggered', () => {
    mockGetValue.mockReturnValue({
      person: {
        name: 'Kevin',
        cpf: '55555555555',
        age: '22',
        monthlyIncome: '5000',
        city: 'Campinas',
      },
      credit_result: {
        status: 'DENIED',
      },
    });
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/person',
      },
      writable: true,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AcquisitionForm />
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByText('Fazer outra simulação'));

    expect(mockRemoveItem).toHaveBeenCalled();
  });
});
