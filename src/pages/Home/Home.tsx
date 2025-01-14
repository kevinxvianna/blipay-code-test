import React from 'react';
import * as S from './Home.styles';

import { ProductCardGrid } from '../../components/ProductCardGrid';

export const Home: React.FC = () => {
  return (
    <S.Container>
      <S.Title>
        Apoio financeiro para quem busca crescer de forma sustentável
      </S.Title>
      <S.Description>
        Essas são algumas soluções disponíveis para você
      </S.Description>
      <ProductCardGrid />
    </S.Container>
  );
};

export default Home;
