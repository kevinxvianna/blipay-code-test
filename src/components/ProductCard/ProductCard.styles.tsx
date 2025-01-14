import styled from 'styled-components';
import {
  Card as BootstrapCard,
  Button as BootstrapButton,
} from 'react-bootstrap';

export const Card = styled(BootstrapCard)`
  width: 250px;
  height: 350px;

  border: 0px;
  border-radius: 12px;

  background-color: #174d74;

  align-items: center;
  justify-content: center;

  @media (max-width: 767.98px) {
    display: block;
    margin-bottom: 16px;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-rows: 3fr 5fr 2fr;
  gap: 12px;

  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  color: #fff;
  margin-top: 24px;
`;

export const Description = styled.p`
  font-size: 0.8rem;
  text-align: center;
  color: #fff;
  padding: 72px 24px 0px 24px;
`;

export const Button = styled(BootstrapButton).attrs({ variant: 'success' })`
  margin: 0px 32px 24px;
  font-weight: 500;
`;
