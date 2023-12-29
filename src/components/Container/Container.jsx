import React from 'react';
import { ContainerStyled } from './Container.styled';

export default function Container({ children }) {
  return (<ContainerStyled>
    {children}
  </ContainerStyled>);
}
