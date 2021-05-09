/* eslint-disable no-redeclare */
import type { NextApiRequestSession } from '@/interfaces';
import withSession from '@/lib/withSession';
import type { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestSession, res: NextApiResponse) => {
    const user = req.session.get('user');

    if (user) {
      res.json({
        isLoggedIn: true,
        ...user
      });
    } else {
      res.json({
        isLoggedIn: false
      });
    }
  }
);
