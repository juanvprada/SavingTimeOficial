import { DataTypes, Model} from 'sequelize';
import conectionDB from '../database/conectionDb'; 
import { Publication } from '../interface/modelInterface';


interface PostBlog extends Model<Publication>, Publication {}
 const PostBlog = conectionDB.define('back_bioblog', {
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

export default PostBlog;
