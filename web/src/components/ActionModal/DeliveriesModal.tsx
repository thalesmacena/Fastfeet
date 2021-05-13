import { api } from '@/services/api';
import { useClickOut } from '@/util/useCloseModal';
import Link from 'next/link';
import { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';
import { MdCreate, MdDeleteForever, MdVisibility } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import ConfirmModal from '../ConfirmModal';
import { ModalContainer } from './styles';

interface IDeliveriesModal {
  page: string;
  handleInfo: (delivery: any) => void;
  delivery: any;
  hide: Dispatch<SetStateAction<boolean>>;
}

export const DeliveriesModal = ({
  page,
  handleInfo,
  delivery,
  hide
}: IDeliveriesModal) => {
  const { colors } = useContext(ThemeContext);

  const modal = useClickOut(() => {
    hide(false);
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(true);

  const message = useMemo(
    () => `Tem certeza que deseja deletar a encomenda #${delivery.id}?`,
    [delivery]
  );

  const title = useMemo(() => 'Deletar Encomendas', []);

  const handleVisible = () => {
    setVisible(true);
    setModalVisible(false);
  };

  const handleConfirmDelete = () => {
    setModalVisible(!modalVisible);
    setVisible(false);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/deliveries/${delivery.id}`);

      toast.success(`Entrega #${delivery.id} deletada com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar deletar a Entrega');
    }
  };

  return (
    <>
      {visible && (
        <ModalContainer ref={modal}>
          <>
            <div>
              <button type="button" onClick={() => handleInfo(delivery)}>
                <MdVisibility size={18} color={colors.primary} />
                Visualizar
              </button>
            </div>
            <div>
              <Link href={page}>
                <a>
                  <MdCreate size={18} color={colors.primary} />
                  Editar
                </a>
              </Link>
            </div>
            <div>
              <button type="button" onClick={handleConfirmDelete}>
                <MdDeleteForever size={18} color={colors.error} />
                Excluir
              </button>
            </div>
          </>
        </ModalContainer>
      )}
      {modalVisible && (
        <ConfirmModal
          title={title}
          message={message}
          resetVisible={handleVisible}
          action={handleDelete}
        />
      )}
    </>
  );
};
