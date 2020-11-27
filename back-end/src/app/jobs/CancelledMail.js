import Mail from '../../lib/Mail';

class RegisterEmail {
  get key() {
    return 'CancelledEmail'; // chave unica
  }

  async handle({ data }) {
    const { delivery, problem } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda Cancelada',
      template: 'cancelled',
      context: {
        deliveryman: delivery.deliveryman.name,
        description: problem.description,
        product: delivery.product,
        destinatario: delivery.recipient.name,
        rua: delivery.recipient.rua,
        numero: delivery.recipient.numero,
        complemento: delivery.recipient.complemento,
        cidade: delivery.recipient.cidade,
        estado: delivery.recipient.estado,
        cep: delivery.recipient.cep,
      },
    });
  }
}

export default new RegisterEmail();
