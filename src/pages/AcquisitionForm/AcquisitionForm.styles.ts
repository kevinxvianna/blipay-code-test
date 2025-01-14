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
