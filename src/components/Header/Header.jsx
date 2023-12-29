import React from 'react';
import { HeaderStyled, NavListStyled, StyledLink } from './Header.styled';
import Container from '../Container/Container';

export default function Header() {
  return (<HeaderStyled>
    <Container>
      <nav>
        <NavListStyled>
          <li>
            <StyledLink to='/'>Home</StyledLink>
          </li>
          <li>
            <StyledLink to='/movies'>Movies</StyledLink>
          </li>
        </NavListStyled>
      </nav>
    </Container>
  </HeaderStyled>);
}
