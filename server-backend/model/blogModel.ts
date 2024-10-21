// models/Book.ts
import { DataTypes, Model} from 'sequelize';
import conectionDB from '../database/conectionDB'; // Importa tu conexión a la base de datos
import { CatMeme } from '../Interfaces/catInterfaces';
// Definición de los atributos de Book

interface catMeme extends Model<CatMeme>, CatMeme {}
 const catMeme = conectionDB.define('catMeme', { // aqui cambia el mongodb

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  likes : {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
{
  timestamps: false,
});

export default catMeme;
