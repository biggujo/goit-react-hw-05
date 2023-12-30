import React from 'react';
import { Link } from 'react-router-dom';
import { WrapperStyled } from './AdditionalInfo.styled';
import { ListItemStyled } from '../ListItem/ListItem.styled';

export default function AdditionalInfo() {
  return (<WrapperStyled>
    <p>Additional information</p>
    <ul>
      <ListItemStyled>
        <Link to='cast'>Cast</Link>
      </ListItemStyled>
      <ListItemStyled>
        <Link to='reviews'>Reviews</Link>
      </ListItemStyled>
    </ul>
  </WrapperStyled>);
}
