import Bee from 'bee-queue';
import CancelledMail from '../app/jobs/CancelledMail';
import RegisterMail from '../app/jobs/RegisterMail';
import redisConfig from '../config/redis'; // IMPORTAÇÃO DAS CONFIG DO REDIS

const jobs = [RegisterMail, CancelledMail]; // CRIANDO UM ARRAY DE JOBS IGUAL OS DE MODEL

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    // FUNÇÃO QUE ADICIONA UM JOB A FILA
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    // FUNÇÃO QUE PROCESSA AS FILAS
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
