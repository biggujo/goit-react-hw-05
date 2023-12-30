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

export const HeaderStyled = styled('header')`
  position: relative;

  display: flex;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  height: 80px;
  margin-bottom: 20px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const NavListStyled = styled('ul')`
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;

  list-style: none;
`;
