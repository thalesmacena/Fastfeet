import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class OrderController {
  async index(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const { deliverymanId } = req.params;

    if (!deliverymanId) {
      return res.status(400).json({ error: 'Deliveryman does not Exist' });
    }

    const deliverys = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        end_date: { [Op.not]: null },
      },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'cancelable',
        'start_date',
        'end_date',
      ],
      limit,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
        },
      ],
    });

    return res.json(deliverys);
  }
}

export default new OrderController();
