import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  // Método para definir las asociaciones
  static associate() {
    const Comment = require('./commentModel').default;
    const Like = require('./likeModel').default;
    User.hasMany(Comment, { foreignKey: 'userId' });
    User.hasMany(Like, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });
    Like.belongsTo(User, { foreignKey: 'userId' });
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;


