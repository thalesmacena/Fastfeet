import type { NextApiRequestSession } from '@/interfaces';
import withSession from '@/lib/withSession';
import type { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestSession, res: NextApiResponse) => {
    req.session.destroy();
    res.json({ isLoggedIn: false });
  }
);
