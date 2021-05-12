import { useEffect, useState } from 'react';
import { StatusTagContainer } from './styles';

const StatusTag = ({ delivery }: any) => {
  const [statusText, setStatusText] = useState('');
  const [statusTag, setStatusTag] = useState('');

  useEffect(() => {
    if (delivery.canceled_at) {
      setStatusText('CANCELADA');
      setStatusTag('canceled');
    } else if (delivery.end_date) {
      setStatusText('ENTREGUE');
      setStatusTag('delivered');
    } else if (delivery.start_date) {
      setStatusText('RETIRADA');
      setStatusTag('takeout');
    } else {
      setStatusText('PENDENTE');
      setStatusTag('pending');
    }
  }, [delivery]);

  return (
    <StatusTagContainer statusTag={statusTag}>{statusText}</StatusTagContainer>
  );
};

export default StatusTag;
