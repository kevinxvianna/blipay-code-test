import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as S from './Company.styles';
import { Button } from 'react-bootstrap';
import { CustomerTypes } from '../../../../types';
import { useFetchLoanSimulation } from '../../../../hooks/useFetchLoanSimulation/useFetchLoanSimulation';
import { useSetLoanSimulations } from '../../../../hooks/useSetLoanSimulations/useSetLoanSimulations';
import { SimulationResult } from '../../../../components/SimulationResult';

export const Company: React.FC = () => {
  const { data, mutate } = useFetchLoanSimulation(CustomerTypes.COMPANY);

  const { setValue, getValue, removeItem } = useSetLoanSimulations(
    CustomerTypes.COMPANY,
  );

  const localStorageData = getValue();

  const formik = useFormik({
    initialValues: {
      companyName: '',
      cnpj: '',
      monthlyRevenue: '',
      city: '',
    },
    validationSchema: Yup.object({
      companyName: Yup.string()
        .min(8, 'A razão social precisa ter no mínimo 8 caracteres')
        .required('Obrigatório'),
      cnpj: Yup.string()
        .min(11, 'O CNPJ precisa ter 11 caracteres')
        .max(11, 'O CNPJ precisa ter no máximo 11 caracteres')
        .required('Obrigatório'),
      monthlyRevenue: Yup.number()
        .min(500, 'O faturamento precisa ser maior que R$ 500,00')
        .required('Obrigatório'),
      city: Yup.string()
        .min(1, 'Esse campo não pode ficar em branco')
        .required('Obrigatório'),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      setValue({
        company: {
          ...formik.values,
        },
        credit_result: {
          status: data.status,
          ...(data.status === 'APPROVED' ? { max_amount: data.amount } : {}),
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (data !== undefined && localStorageData) {
    return <SimulationResult data={getValue()} clearSimulation={removeItem} />;
  }

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.FormWrapper>
        <S.Form.Label htmlFor="companyName">Razão social</S.Form.Label>
        <S.Form.Control
          id="companyName"
          name="companyName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.companyName}
        />
        {formik.touched.companyName && formik.errors.companyName ? (
          <S.ErrorSection>{formik.errors.companyName}</S.ErrorSection>
        ) : null}
      </S.FormWrapper>

      <S.FormWrapper>
        <S.Form.Label htmlFor="cnpj">CNPJ</S.Form.Label>
        <S.Form.Control
          id="cnpj"
          name="cnpj"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cnpj}
        />
        {formik.touched.cnpj && formik.errors.cnpj ? (
          <S.ErrorSection>{formik.errors.cnpj}</S.ErrorSection>
        ) : null}
      </S.FormWrapper>

      <S.FormWrapper>
        <S.Form.Label htmlFor="monthlyRevenue">Faturamento mensal</S.Form.Label>
        <S.Form.Control
          id="monthlyRevenue"
          name="monthlyRevenue"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.monthlyRevenue}
        />
        {formik.touched.monthlyRevenue && formik.errors.monthlyRevenue ? (
          <S.ErrorSection>{formik.errors.monthlyRevenue}</S.ErrorSection>
        ) : null}
      </S.FormWrapper>

      <S.FormWrapper>
        <S.Form.Label htmlFor="city">Cidade</S.Form.Label>
        <S.Form.Control
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city ? (
          <S.ErrorSection>{formik.errors.city}</S.ErrorSection>
        ) : null}
      </S.FormWrapper>

      <Button variant="success" type="submit">
        Enviar
      </Button>
    </S.Form>
  );
};
