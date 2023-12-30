import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const GoBackLinkStyled = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 12px;
  padding: 7px;

  color: initial;
  border-radius: 7px;
  border: 1px solid #808080;

  text-decoration: none;

  &:active {
    color: #000000;
    background-color: #f08080;
  }

  &:visited {
    color: initial;
  }

  &:hover {
    border: 1px solid #f08080;
  }
`;
