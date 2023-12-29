import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Container from '../Container/Container';

export default function Layout() {
  return (<>
    <Header />
    <Container>
      <main>
        <Outlet />
      </main>
    </Container>
  </>);
}
