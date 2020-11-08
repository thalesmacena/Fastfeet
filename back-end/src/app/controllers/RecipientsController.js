import Recipients from '../models/Recipients';

class RecipientsController {
  async index(req, res) {
    const recipients = await Recipients.findAll();

    return res.json({ recipients });
  }

  async store(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new RecipientsController();
