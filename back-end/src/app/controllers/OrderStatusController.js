import { endOfDay, getHours, isBefore, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class OrderStatusController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date().when('start_date', (start_date, field) =>
        start_date ? field : field.required()
      ),
      signature_id: Yup.number().when('end_date', (end_date, field) =>
        end_date ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Check if Deliveryman exist

    const deliveryman = await Deliveryman.findOne({
      where: { user_id: req.userId },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    // Check if Delivery Exists
    const { deliveryId } = req.params;

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    // Check if Delivery belongsTo Deliveryman
    if (delivery.deliveryman_id !== deliveryman.id) {
      return res
        .status(401)
        .json({ error: 'Delivery does not belong to Deliveryman' });
    }

    // Check if Delivery is closed
    if (delivery.end_date !== null || delivery.canceled_at !== null) {
      return res.status(400).json({ error: 'Delivery is closed' });
    }

    // Check start_date
    if (req.body.start_date) {
      const date = parseISO(req.body.start_date);
      const hour = getHours(date);

      // Check if start_date beetween 08:00 e 18:00h
      if (hour <= 8 || hour >= 18) {
        return res.status(400).json({
          error: 'The withdraw must be made between 8 am and 6 pm',
        });
      }

      // Check if the Number of Day Orders
      const deliveriesAll = await Delivery.findAll({
        where: {
          deliveryman_id: deliveryman.id,
          canceled_at: null,
          start_date: {
            [Op.between]: [startOfDay(date), endOfDay(date)],
          },
          end_date: null,
        },
      });

      if (deliveriesAll.length >= 5) {
        return res
          .status(401)
          .json({ error: 'Deliveryman already has 5 deliveries on this day' });
      }
    }

    // check if end_date is after start_date
    if (req.body.end_date) {
      const endDate = parseISO(req.body.end_date);
      const startDate = parseISO(delivery.start_date);

      if (isBefore(startDate, endDate)) {
        return res
          .status(400)
          .json({ error: 'The end_date is before start_date' });
      }
    }

    // update delivery

    const updated = await delivery.update(req.body);

    await updated.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
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
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(updated);
  }
}

export default new OrderStatusController();
