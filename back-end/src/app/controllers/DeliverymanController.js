import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import User from '../models/User';

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'avatar_id', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      email: Yup.string().required(),
      user_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const alreadyExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (alreadyExists) {
      res
        .status(400)
        .json({ error: 'There is already a registered user with this email' });
    }

    const { user_id } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'user does not exist' });
    }

    const { id, name, avatar_id, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, avatar_id, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email },
      });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists' });
      }
    }

    const { id, name, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      res.status(400).json({ error: 'Deliveryman does not exist.' });
    }

    const user = await User.findByPk(deliveryman.user_id);

    await deliveryman.destroy(deliveryman);
    await user.destroy(user);

    return res.json({
      message: 'Deliveryman and user has been deleted.',
      name: deliveryman.name,
    });
  }
}

export default new DeliverymanController();
