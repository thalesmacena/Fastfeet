import { ButtonSelection, ConfirmModalContainer, OverlayModal } from './styles';

interface IConfirmModal {
  message: string;
  action?: () => void;
  resetVisible?: () => void;
}

const ConfirmModal = ({ message, action, resetVisible }: IConfirmModal) => {
  return (
    <OverlayModal>
      <ConfirmModalContainer>
        <strong>{message}</strong>
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
