import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledLink = styled(NavLink)`
  color: black;

  font-size: 18px;
  font-weight: 700;
  text-decoration: none;

  &.active {
    color: lightcoral;
  }
`;

export const NavListStyled = styled('ul')`
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;

  list-style: none;
`;
