import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (<div>
    <p>404 - Page not found</p>
    <Link to={'/'}>Go to home page</Link>
  </div>);
}
