import React from 'react';
import { HeaderStyled } from './Header.styled';
import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation.jsx';

export default function Header() {
  return (<HeaderStyled>
    <Container>
      <Navigation />
    </Container>
  </HeaderStyled>);
}
