import React from 'react';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
    const { query } = useParams();
    return <p>search results / {query}</p>;
};

export default SearchResult;
