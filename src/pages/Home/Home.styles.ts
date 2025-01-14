import styled from 'styled-components';

export const Container = styled.div`
  height: 80vh;

  margin: 0px auto;
  padding: 32px 80px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767.98px) {
    padding: 12px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;

  text-align: center;

  margin-top: 64px;
  max-width: 750px;

  @media (max-width: 767.98px) {
    margin-top: 0px;
    padding: 32px 24px 24px 32px;
  }
`;

export const Description = styled.h2`
  font-size: 1rem;
  font-weight: 300;

  text-align: center;

  @media (max-width: 767.98px) {
    padding: 0px 64px;
  }
`;
