import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async index(req, res) {
    const recipients = await Recipients.findAll();

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

    const recipientExist = await Recipients.findOne({
      where: {
        name: req.body.name,
        rua: req.body.rua,
        numero: req.body.numero,
      },
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'Recipient already exist' });
    }

    const recipient = await Recipients.create(req.body);

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

    const recipient = await Recipients.findByPk(req.params.id);

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

export default new RecipientsController();
