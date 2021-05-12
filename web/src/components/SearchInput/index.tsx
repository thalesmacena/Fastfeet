import { Dispatch, SetStateAction } from 'react';
import { MdSearch } from 'react-icons/md';
import { SearchInputContainer } from './styles';

interface ISearchInputProps {
  placeholder: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ placeholder, query, setQuery }: ISearchInputProps) => {
  return (
    <SearchInputContainer>
      <MdSearch size={22} color="#999" />
      <input
        type="text"
        placeholder={`Buscar por ${placeholder}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
