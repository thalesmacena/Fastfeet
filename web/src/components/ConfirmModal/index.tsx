import { useClickOut } from '@/util/useCloseModal';
import { ButtonSelection, ConfirmModalContainer, OverlayModal } from './styles';

interface IConfirmModal {
  title: string;
  message: string;
  action?: () => void;
  resetVisible?: () => void;
}

const ConfirmModal = ({
  title,
  message,
  action,
  resetVisible
}: IConfirmModal) => {
  const modal = useClickOut(() => {
    resetVisible();
  });

  return (
    <OverlayModal>
      <ConfirmModalContainer ref={modal}>
        <strong>{title}</strong>
        <span>{message}</span>
        <ButtonSelection>
          <button type="button" onClick={action}>
            Sim
          </button>
          <button type="button" onClick={resetVisible}>
            Não
          </button>
        </ButtonSelection>
      </ConfirmModalContainer>
    </OverlayModal>
  );
};

export default ConfirmModal;
