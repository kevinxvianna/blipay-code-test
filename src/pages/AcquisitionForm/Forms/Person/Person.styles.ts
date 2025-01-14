import styled from 'styled-components';
import { Form as BootstrapForm } from 'react-bootstrap';

export const FormWrapper = styled.div`
  margin-top: 24px;

  &:last-of-type {
    margin-bottom: 24px;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const Form = styled(BootstrapForm)`
  width: 400px;
`;

export const ErrorSection = styled.div`
  color: red;
`;
