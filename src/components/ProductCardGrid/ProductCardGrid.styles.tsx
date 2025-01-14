import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr;
  gap: 24px;

  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 500px;

  height: 500px;

  margin-top: 32px;

  @media (max-width: 767.98px) {
    display: block;

    height: auto;
  }
`;
