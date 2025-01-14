import React from 'react';
import * as S from './ProductCardGrid.styles';
import { ProductCard } from '../ProductCard';
import { ROUTER_PATHS } from '../../constants';

export const ProductCardGrid: React.FC = () => {
  return (
    <S.Container data-testid="product-card-grid">
      <ProductCard
        title="Credito para mim"
        description="Crédito rápido, com taxas acessíveis e prazos flexíveis, para que você possa realizar seus planos sem burocracia."
        page={ROUTER_PATHS.PERSON}
      />
      <ProductCard
        title="Credito para minha empresa"
        description="crédito rápido, com taxas acessíveis e prazos flexíveis, para que você possa investir do jeito que sua empresa precisa."
        page={ROUTER_PATHS.COMPANY}
      />
    </S.Container>
  );
};
