import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';  // Supondo que você exporta o sequelize do arquivo database

// Interface para definir os atributos do modelo User
interface UserAttributes {
  id?: number;      // O campo `id` será automaticamente gerado e pode ser opcional
  name: string;
  email: string;
}

// Interface para criar um novo User, onde `id` não é necessário
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Definindo o modelo com sequelize e estendendo a classe Model do sequelize
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Definindo o modelo
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
  },
  {
    sequelize, // Conexão com o banco de dados
    modelName: 'User',
    tableName: 'users',  // Nome da tabela no banco de dados
    timestamps: true,    // Inclui as colunas createdAt e updatedAt
  }
);

export default User;
