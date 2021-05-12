import Link from 'next/link';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { MdAdd } from 'react-icons/md';
import SearchInput from '../SearchInput';
import { Container, ListTable } from './styles';

interface IListProps {
  page: string;
  title: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  children: ReactNode;
}

const List = ({ children, page, title, query, setQuery }: IListProps) => {
  return (
    <Container>
      <header>
        <SearchInput placeholder={title} query={query} setQuery={setQuery} />
        <Link href={`/dashboard/${page}/cadastrar`} passHref>
          <a>
            <MdAdd size={17} color="#fff" />
            CADASTRAR
          </a>
        </Link>
      </header>
      <ListTable>{children}</ListTable>
    </Container>
  );
};

export default List;
