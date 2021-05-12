import withSession from '@/lib/withSession';
import { api } from '@/services/api';
import { GetServerSideProps } from 'next';

interface IDelivery {
  id: string;
  product: string;
}

interface IEditDelivery {
  user: any;
  delivery: IDelivery;
}

const EditDelivery = ({ user, delivery }: IEditDelivery) => {
  api.defaults.headers.Authorization = `Bearer ${user.token}`;

  return (
    <div>
      <h1>{delivery.product}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ params, req }: any) => {
    const { deliveryId } = params;
    const user = req.session.get('user');

    if (user === undefined) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false
        }
      };
    }

    const { data } = await api.get(`/deliveries/${deliveryId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    if (!data) {
      return {
        redirect: {
          destination: '/dashboard/deliveries',
          permanent: false
        }
      };
    }

    return {
      props: { user: req.session.get('user'), delivery: data }
    };
  }
);

export default EditDelivery;
