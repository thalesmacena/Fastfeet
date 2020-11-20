import Sequelize from 'sequelize';
import Delivery from '../app/models/Delivery';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Recipients from '../app/models/Recipients';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, Recipients, File, Deliveryman, Delivery];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
