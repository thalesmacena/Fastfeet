import Recipients from '../models/Recipients';
import User from '../models/User';

class RecipientsController {
  async index(req, res) {
    const users = await User.findAll();
    const recipients = await Recipients.findAll();

    return res.json({ recipients, users });
  }

  async store(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new RecipientsController();
