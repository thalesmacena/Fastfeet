import { DeliveriesModal } from '@/components/ActionModal';
import DefaultLayout from '@/components/DefaultLayout';
import List from '@/components/List';
import ListAction from '@/components/ListAction';
import { LoadingSpin } from '@/components/LoadingSpin';
import StatusTag from '@/components/StatusTag';
import withSession from '@/lib/withSession';
import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

interface IDeliveries {
  user: any;
}

const Deliveries = ({ user }: IDeliveries) => {
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryData, setDeliveryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const { colors } = useContext(ThemeContext);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [visible, setVisible] = useState(false);

  api.defaults.headers.Authorization = `Bearer ${user.token}`;

  const handleDeliveryInfos = (delivery: any) => {
    setDeliveryData(delivery);
    setVisible(true);
  };

  useEffect(() => {
    const getDeliveries = async () => {
      setLoading(true);
      try {
        const response = await api.get('/deliveries', {
          params: {
            q: query
          }
        });
        const { data } = response;

        setDeliveries(data);
      } catch {
        toast.error('Houve um erro ao obter as entregas');
      } finally {
        setLoading(false);
      }
    };
    clearInterval(timer);
    const timeout = setTimeout(() => {
      getDeliveries();
    }, 1000);

    setTimer(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <DefaultLayout>
      <>
        <h1>Gerenciando encomendas</h1>
        <List
          page="deliveries"
          title="Encomendas"
          query={query}
          setQuery={setQuery}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(({ deliveryman, recipient, ...delivery }) => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{recipient.name}</td>
                <td>
                  <div>
                    <img
                      src={
                        deliveryman.avatar.url ||
                        `https://ui-avatars.com/api/?name=${deliveryman.name}&background=random&size=50&format=svg`
                      }
                      alt="Avatar"
                    />
                    {deliveryman.name}
                  </div>
                </td>
                <td>{recipient.cidade}</td>
                <td>{recipient.estado}</td>
                <td>
                  <StatusTag delivery={delivery} />
                </td>
                <td>
                  <ListAction>
                    <DeliveriesModal
                      delivery={delivery}
                      handleInfo={handleDeliveryInfos}
                      page={`/dashboard/deliveries/edit/${delivery.id}`}
                    />
                  </ListAction>
                </td>
              </tr>
            ))}
          </tbody>
        </List>
        {loading && (
          <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <LoadingSpin color={colors.secondary} size={30} spinWidth={3} />
          </p>
        )}
        {!deliveries.length && !loading && (
          <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Não existem entregas cadastradas
          </p>
        )}
      </>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req }) => {
    const user = req.session.get('user');

    if (user === undefined) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false
        }
      };
    }

    return {
      props: { user: req.session.get('user') }
    };
  }
);

export default Deliveries;
