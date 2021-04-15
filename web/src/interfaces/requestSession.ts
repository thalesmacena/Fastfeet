import { NextApiRequest } from 'next';
import { Session } from 'next-iron-session';

export interface NextApiRequestSession extends NextApiRequest {
  session: Session;
}
