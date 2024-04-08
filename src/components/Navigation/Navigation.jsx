import React from 'react';
import { NavListStyled, StyledLink } from './Navigation.styled.js';

export default function Navigation() {
  return (<nav>
    <NavListStyled>
      <li>
        <StyledLink to='/'>Home</StyledLink>
      </li>
      <li>
        <StyledLink to='/movies'>Movies</StyledLink>
      </li>
    </NavListStyled>
  </nav>);
}
