import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json({ users });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation Error' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
    }

    if (!req.body.admin) {
      req.body.admin = false;
    }

    const { id, name, email, admin } = await User.create(req.body);

    return res.json({ id, name, email, admin });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      admin: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ erro: 'User does not exist' });
    }

    const { id, name, email, admin } = await user.update({
      name: req.body.name,
      email: req.body.email,
      admin: req.body.admin,
    });

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
