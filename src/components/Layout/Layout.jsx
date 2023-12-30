import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Container from '../Container/Container';
import LoadingFallback from '../LoadingFallback/LoadingFallback';

export default function Layout() {
  return (<>
    <Header />
    <Container>
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  </>);
}
