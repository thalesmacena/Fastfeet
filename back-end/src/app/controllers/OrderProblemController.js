import { Op } from 'sequelize';
import * as Yup from 'yup';
import Queue from '../../lib/Queue';
import CancelledMail from '../jobs/CancelledMail';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';
import Recipient from '../models/Recipient';

class OrderProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      attributes: ['delivery_id'],
    });

    const Ids = problems.map((problem) => problem.delivery_id);

    const deliverys = await Delivery.findAll({
      where: { id: { [Op.in]: Ids } },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      offset: (page - 1) * 10,
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
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
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

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: delivery.id },
      attributes: ['id', 'description'],
    });

    if (!problems) {
      return res.json({ message: 'There is no problem with this delivery' });
    }

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // check if deliveryman exists
    const deliveryman = await Deliveryman.findOne({
      where: { user_id: req.userId },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    // check if the delivery Exists
    const { deliveryId } = req.params;

    const delivery = await Delivery.findByPk(deliveryId, {
      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'canceled_at',
        'cancelable',
        'start_date',
        'end_date',
      ],
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
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
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
    if (delivery.signature_id || delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery is closed' });
    }

    const { description } = req.body;
    // Store the problem
    const { id } = await DeliveryProblem.create({
      description,
      delivery_id: deliveryId,
    });

    return res.status(201).json({ id, description, delivery });
  }

  async delete(req, res) {
    const { problemId } = req.params;

    const problem = await DeliveryProblem.findByPk(problemId, {
      attributes: ['id', 'description', 'delivery_id'],
    });

    // check if problem exist
    if (!problem) {
      return res.status(400).json({ error: 'Problem does not exist' });
    }

    // check if delivery exist
    const delivery = await Delivery.findByPk(problem.delivery_id, {
      attributes: [
        'id',
        'product',
        'canceled_at',
        'cancelable',
        'start_date',
        'end_date',
      ],
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
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
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

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    // check if delivery has already beeen canceled
    if (delivery.canceled_at !== null) {
      return res.status(401).json({ error: 'Delivery already canceled' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    await Queue.add(CancelledMail.key, {
      delivery,
      problem,
    });

    return res.json(problem);
  }
}

export default new OrderProblemController();
