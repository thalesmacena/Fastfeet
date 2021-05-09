import type { NextApiRequestSession } from '@/interfaces';
import withSession from '@/lib/withSession';
import { api } from '@/services/api';
import type { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestSession, res: NextApiResponse) => {
    const { email, password } = await req.body;

    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const user = {
        isLoggedIn: true,
        name: response.data.user.name,
        email: response.data.user.email,
        admin: response.data.user.admin,
        token: response.data.token
      };

      req.session.set('user', user);

      await req.session.save();
      return res.status(200).json(user);
    } catch {
      return res.status(401).json({ error: 'Login invalid' });
    }
  }
);
