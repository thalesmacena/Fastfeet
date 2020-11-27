import User from '../models/User';

export default async (req, res, next) => {
  const checkIfUserAdmin = await User.findOne({
    where: { id: req.userId, admin: true },
  });

  if (!checkIfUserAdmin) {
    return res
      .status(401)
      .json({ error: 'Only admins can access this functionality' });
  }

  return next();
};
