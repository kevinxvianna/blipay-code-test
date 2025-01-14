import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';
import {
  ALL_SIMULATIONS_KEY,
  SINGLE_SIMULATION_KEY,
} from '../../constants/keys';

import { Button, Table } from 'react-bootstrap';

import * as S from './SimulationsList.styles';

import { CompanyCategory, CustomerTypes, PersonCategory } from '../../types';

export const SimulationsList: React.FC = () => {
  const { getValue, removeItem: removeAllSimulations } =
    useLocalStorage(ALL_SIMULATIONS_KEY);
  const { removeItem: removeCompanySimulation } = useLocalStorage(
    `${SINGLE_SIMULATION_KEY}-${CustomerTypes.COMPANY}`,
  );
  const { removeItem: removePersonSimulation } = useLocalStorage(
    `${SINGLE_SIMULATION_KEY}-${CustomerTypes.PERSON}`,
  );

  const data = getValue();

  const hasAnySimulation = data !== null;

  const handleDeleteSimulations = () => {
    removeCompanySimulation();
    removeAllSimulations();
    removePersonSimulation();
  };

  const { companies, hasCompanyCategory, hasPersonCategory, persons } =
    useMemo(() => {
      const hasCompanyCategory = data ? data['companies'] : false;
      const hasPersonCategory = data ? data['persons'] : false;

      let companies;
      let persons;

      if (hasCompanyCategory) {
        companies = data.companies.map((data: CompanyCategory, i: number) => {
          return (
            <React.Fragment key={i + 1}>
              <tr>
                <td>{data.company.companyName}</td>
                <td>{data.company.cnpj}</td>
                <td>{data.company.monthlyRevenue}</td>
                <td>{data.credit_result.status}</td>
                <td>
                  {data.credit_result.max_amount &&
                    `R$ ${data.credit_result.max_amount},00`}
                </td>
              </tr>
            </React.Fragment>
          );
        });
      }

      if (hasPersonCategory) {
        persons = data.persons.map((data: PersonCategory, i: number) => {
          return (
            <React.Fragment key={i + 1}>
              <tr>
                <td>{data.person.name}</td>
                <td>{data.person.cpf}</td>
                <td>{data.person.monthlyIncome}</td>
                <td>{data.credit_result.status}</td>
                <td>
                  {data.credit_result.max_amount &&
                    `R$ ${data.credit_result.max_amount},00`}
                </td>
              </tr>
            </React.Fragment>
          );
        });
      }

      return {
        hasCompanyCategory,
        hasPersonCategory,
        persons: persons,
        companies: companies,
      };
    }, [data]);

  if (!hasAnySimulation) {
    return (
      <S.Container>
        <S.Title>A lista está vazia!</S.Title>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>Lista de simulações</S.Title>
      {hasCompanyCategory ? (
        <>
          <S.CategoryName>Pessoas jurídicas</S.CategoryName>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>CNPJ</th>
                <th>Faturamento</th>
                <th>Status</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>{companies}</tbody>
          </Table>
        </>
      ) : null}

      {hasPersonCategory ? (
        <>
          <S.CategoryName>Pessoas físicas</S.CategoryName>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Renda mensal</th>
                <th>Status</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>{persons}</tbody>
          </Table>
        </>
      ) : null}

      {hasAnySimulation && (
        <Button variant="danger" onClick={handleDeleteSimulations}>
          Limpar simulações
        </Button>
      )}
    </S.Container>
  );
};
