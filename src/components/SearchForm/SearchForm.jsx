import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SearchForm({ queryKey }) {
  const [currentQueryValue, setCurrentQueryValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') ?? '';

  useEffect(() => {
    setCurrentQueryValue(queryParam);
  }, []);

  const handleQueryValueChange = (newValue) => {
    setCurrentQueryValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements['query'].value;

    if (query.trim() === '') {
      setSearchParams({});
      return;
    }

    setSearchParams({
      query,
    });
  };

  return (<form onSubmit={handleSubmit}>
    <input type='text'
           name='query'
           value={currentQueryValue}
           onChange={(e) => handleQueryValueChange(e.target.value)}
    />
    <button type='submit'>Search</button>
  </form>);
}

SearchForm.propTypes = {
  queryKey: PropTypes.string.isRequired,
};
