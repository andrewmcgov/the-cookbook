import * as React from 'react';
import { useQuery, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';

import Page from '../Page';
import Error from '../Error';
import RecipeCard from '../RecipeCard';
import { IRecipe } from '../types';

export const SEARCH_QUERY = gql`
  query SEARCH_QUERY($searchTerm: String) {
    search(searchTerm: $searchTerm) {
      _id
      title
      description
      tags
      slug
      image {
        medium
      }
    }
  }
`;

interface ISearchResult {
  search: IRecipe[];
}

interface ISearchVariables {
  searchTerm: string;
}

interface SearchResultsProps {
  searchTerm: string;
}

function SearchPage() {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pageTitle, setPageTitle] = React.useState('Search');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPageTitle(`Search results for ${searchValue}`);
    setSearchTerm(searchValue);
  }

  return (
    <Page title={pageTitle}>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Enter a search term..."
          onChange={e => setSearchValue(e.target.value)}
        />
        <button type="submit" className="button button-primary">
          Search
        </button>
      </form>
      {searchTerm != '' && (
        <SearchResults searchTerm={searchTerm}></SearchResults>
      )}
    </Page>
  );
}

function SearchResults({ searchTerm }: SearchResultsProps) {
  const { data, loading, error } = useQuery<ISearchResult, ISearchVariables>(
    SEARCH_QUERY,
    {
      variables: {
        searchTerm
      }
    }
  );

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return (
      <p className="search-loading">
        Searching for <strong>{searchTerm}</strong>
      </p>
    );
  }

  const searchResults = data.search;
  const count = searchResults.length;

  if (count <= 0) {
    return (
      <p className="search-results--none">
        Could not find any results for <strong>{searchTerm}</strong>!
      </p>
    );
  }

  return (
    <>
      <div className="search-results-header">
        <p>
          Found {count} result{count > 1 ? 's' : ''} for{' '}
          <strong>{searchTerm}</strong>!
        </p>
      </div>
      <div className="recipe-card-loop">
        {searchResults.map(recipe => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export default SearchPage;
