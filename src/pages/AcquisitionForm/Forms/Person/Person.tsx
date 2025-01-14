import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as S from './Person.styles';
import { Button } from 'react-bootstrap';
import { CustomerTypes } from '../../../../types';
import { useFetchLoanSimulation } from '../../../../hooks/useFetchLoanSimulation/useFetchLoanSimulation';
import { useSetLoanSimulations } from '../../../../hooks/useSetLoanSimulations/useSetLoanSimulations';
import { SimulationResult } from '../../../../components/SimulationResult';

export const Person: React.FC = () => {
  const { mutate, data } = useFetchLoanSimulation(CustomerTypes.PERSON);
  const { setValue, getValue, removeItem } = useSetLoanSimulations(
    CustomerTypes.PERSON,
  );

  const localStorageData = getValue();

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      age: '',
      monthlyIncome: '',
      city: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(8, 'O nome precisa ter no mínimo 8 caracteres')
        .required('Obrigatório'),
      cpf: Yup.string()
        .min(11, 'O CPF precisa ter 11 caracteres')
        .max(11, 'O CPF precisa ter no máximo 11 caracteres')
        .required('Obrigatório'),
      age: Yup.number()
        .min(0, 'A idade precisa ser maior que 0')
        .required('Obrigatório'),
      monthlyIncome: Yup.string()
        .min(1, 'A renda mensal precisa ser maior que R$ 0,00')
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
        person: {
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
        <S.Form.Label htmlFor="name">Nome completo</S.Form.Label>
        <S.Form.Control
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <S.ErrorSection>{formik.errors.name}</S.ErrorSection>
        ) : null}
      </S.FormWrapper>

      <S.FormWrapper>
        <S.Form.Label htmlFor="cpf">CPF</S.Form.Label>
        <S.Form.Control
          id="cpf"
          name="cpf"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cpf}
        />
        {formik.touched.cpf && formik.errors.cpf ? (
          <S.ErrorSection>{formik.errors.cpf}</S.ErrorSection>
        ) : null}
      </S.FormWrapper>

      <S.FormWrapper>
        <S.Form.Label htmlFor="monthlyIncome">Renda mensal</S.Form.Label>
        <S.Form.Control
          id="monthlyIncome"
          name="monthlyIncome"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.monthlyIncome}
        />
        {formik.touched.monthlyIncome && formik.errors.monthlyIncome ? (
          <S.ErrorSection>{formik.errors.monthlyIncome}</S.ErrorSection>
        ) : null}
      </S.FormWrapper>
      <S.FormWrapper>
        <S.Form.Label htmlFor="age">Idade</S.Form.Label>
        <S.Form.Control
          id="age"
          name="age"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.touched.age && formik.errors.age ? (
          <S.ErrorSection>{formik.errors.age}</S.ErrorSection>
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
