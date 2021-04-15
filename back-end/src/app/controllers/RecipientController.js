import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, q = '' } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: { [Op.iLike]: `%${q}%` },
      },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json({ recipients });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().integer().required(),
      complemento: Yup.string(),
      estado: Yup.string().length(2).required(),
      cidade: Yup.string().required(),
      cep: Yup.string().length(9).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExist = await Recipient.findOne({
      where: {
        name: req.body.name,
        rua: req.body.rua,
        numero: req.body.numero,
      },
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'Recipient already exist' });
    }

    const recipient = await Recipient.create(req.body);

    return res.status(201).json({ recipient });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number().integer(),
      complemento: Yup.string(),
      estado: Yup.string().length(2),
      cidade: Yup.string(),
      cep: Yup.string().length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const {
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }
}

export default new RecipientController();
