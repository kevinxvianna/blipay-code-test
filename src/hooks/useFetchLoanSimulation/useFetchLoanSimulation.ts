import { useMutation } from 'react-query';
import { apiClient } from '../../services/api';
import { CustomerTypes } from '../../types';
import { CompanyFormType, PersonFormType } from '../../types/form';

const fetchCompanyLoanSimulation = (data: CompanyFormType) => {
  return apiClient
    .post(`/credit-score/${CustomerTypes.COMPANY}`, {
      revenue: data.monthlyRevenue,
      name: data.companyName,
      city: data.city,
      document: data.cnpj,
    })
    .then((response) => response.data);
};

const fetchPersonLoanSimulation = async (data: PersonFormType) => {
  return await apiClient
    .post(`/credit-score/${CustomerTypes.PERSON}`, {
      revenue: data.monthlyIncome,
      name: data.name,
      city: data.city,
      document: data.cpf,
      age: data.age,
    })
    .then((response) => response.data);
};

export const useFetchLoanSimulation = (type: CustomerTypes) => {
  return useMutation(async (data: CompanyFormType | PersonFormType) => {
    if (type === CustomerTypes.COMPANY) {
      return await fetchCompanyLoanSimulation(
        data as unknown as CompanyFormType,
      );
    }

    if (type === CustomerTypes.PERSON) {
      return fetchPersonLoanSimulation(data as unknown as PersonFormType);
    }
  });
};
