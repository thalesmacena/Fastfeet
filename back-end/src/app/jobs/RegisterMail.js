import Mail from '../../lib/Mail';

class RegisterEmail {
  get key() {
    return 'RegisterEmail'; // chave unica
  }

  async handle({ data }) {
    const { deliveryman, product, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda Registrada',
      template: 'register',
      context: {
        deliveryman: deliveryman.name,
        product,
        destinatario: recipient.name,
        rua: recipient.rua,
        numero: recipient.numero,
        complemento: recipient.complemento,
        cidade: recipient.cidade,
        estado: recipient.estado,
        cep: recipient.cep,
      },
    });
  }
}

export default new RegisterEmail();
