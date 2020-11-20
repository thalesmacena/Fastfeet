import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipients from '../models/Recipients';

class DeliveryController {
  async index(req, res) {
    const { deliverymanId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const deliverymanExists = await Deliveryman.findByPk({
      where: { deliverymanId },
    });

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

  async store(req, res) {
    return res.json({});
  }

  async update(req, res) {
    return res.json({});
  }

  async delete(req, res) {
    return res.json({});
  }
}

export default new DeliveryController();
