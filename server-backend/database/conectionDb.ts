import { Sequelize } from 'sequelize';
import { DB_USER , DB_PASSWORD , DB_HOST, DB_PORT, DB_TEST_NAME, NODE_ENV, DB_DEV_NAME } from '../config';
                          
const DATABASE_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME;

const connectionDB = new Sequelize( DATABASE_NAME , DB_USER, DB_PASSWORD , {
  host: DB_HOST ,
  dialect: 'mysql',
  port: Number(DB_PORT) || 3306,
  define: {
    timestamps: false,
  },
});

export default connectionDB;