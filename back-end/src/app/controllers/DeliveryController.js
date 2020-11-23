import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipients from '../models/Recipients';

class DeliveryController {
  async index(req, res) {
    const { deliverymanId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const deliverymanExists = await Deliveryman.findByPk(deliverymanId);

    if (!deliverymanExists) {
      return res.status(404).json({ error: 'Deliveryman does not exist.' });
    }

    const deliverys = await Delivery.findAll({
      where: { deliveryman_id: deliverymanId },
      attributes: [
        'id',
        'product',
        'cancelable',
        'canceled_at',
        'cancelable',
        'start_date',
        'end_date',
      ],
      limit,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipients,
          as: 'recipients',
          attributes: [
            'name',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name, email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverys);
  }

  async show(req, res) {
    const { deliveryId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const delivery = await Delivery.findByPk(deliveryId, {
      attributes: [
        'id',
        'product',
        'cancelable',
        'canceled_at',
        'cancelable',
        'start_date',
        'end_date',
      ],
      limit,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipients,
          as: 'recipients',
          attributes: [
            'name',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name, email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const recipientExists = await Recipients.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliverymanExists = await Recipients.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const { id, product } = await Delivery.create(req.body);

    return res.json({ id, product, recipient_id, deliveryman_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const id = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    const recipientExists = await Delivery.findByPk(req.body.recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliverymanExists = await Delivery.findByPk(req.body.deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    const deliveryUpdated = await Delivery.update(req.body);

    return res.json(deliveryUpdated);
  }

  async delete(req, res) {
    const { deliveryId } = req.params;

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    if (delivery.canceled_at !== null) {
      return res.status(401).json({ error: 'Delivery already canceled' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryController();
