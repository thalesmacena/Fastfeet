import Sequelize from 'sequelize';
import Recipients from '../app/models/Recipients';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, Recipients];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
