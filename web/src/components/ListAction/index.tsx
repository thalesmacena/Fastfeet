import { ReactNode, useContext, useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { ThemeContext } from 'styled-components';
import { ListActionContainer } from './styles';

interface IListAction {
  children?: ReactNode;
}

const ListAction = ({ children }: IListAction) => {
  const { colors } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <>
      <ListActionContainer>
        <button type="button" onClick={handleVisible}>
          <MdMoreHoriz size={22} color={colors.secondary} />
        </button>
      </ListActionContainer>
      {visible && children}
    </>
  );
};

export default ListAction;
