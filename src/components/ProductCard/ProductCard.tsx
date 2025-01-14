import React from 'react';
import * as S from './ProductCard.styles';
import { useNavigate } from 'react-router-dom';

type ProductCardPropTypes = {
  title: string;
  description: string;
  page: string;
};

export const ProductCard: React.FC<ProductCardPropTypes> = ({
  title,
  description,
  page,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`${page}`);
  };

  return (
    <S.Card>
      <S.Container>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Button onClick={handleButtonClick}>Quero esse!</S.Button>
      </S.Container>
    </S.Card>
  );
};
