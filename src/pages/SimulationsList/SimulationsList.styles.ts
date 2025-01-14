import styled from 'styled-components';

export const Container = styled.div`
  height: 80vh;

  margin: 0px auto;
  padding: 32px 160px;

  @media (max-width: 767.98px) {
    padding: 12px;
  }

  table {
    &:last-of-type {
      margin-bottom: 48px;
    }
  }
`;

export const CategoryName = styled.h2`
  font-size: 1.25rem;

  margin-top: 64px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;

  text-align: center;

  margin-top: 64px;

  @media (max-width: 767.98px) {
    margin-top: 0px;
    padding: 32px 24px 24px 32px;
  }
`;
