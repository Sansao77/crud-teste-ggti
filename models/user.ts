import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Importa a instância do Sequelize

// Interface para definir os atributos do modelo User
export interface UserAttributes {
  id: string;  // O id será gerado automaticamente como um UUID
  name: string;
  specialty: string;
  crm: string;
  phone?: string;
  email: string;
  date_employment?: string;
  time_begin?: string;
  time_end?: string;
  status?: boolean;
  days_attend?: string[];  // Array de strings
}

// Interface para criação de um novo User, onde `id` não é necessário
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Definindo o modelo com sequelize e estendendo a classe Model do sequelize
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public specialty!: string;
  public crm!: string;
  public phone?: string;
  public email!: string;
  public date_employment?: string;
  public time_begin?: string;
  public time_end?: string;
  public status?: boolean;
  public days_attend?: string[];

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Definindo o modelo
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  // Gera UUID automaticamente
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date_employment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time_begin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time_end: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,  // Pode iniciar como ativo
    },
    days_attend: {
      type: DataTypes.ARRAY(DataTypes.STRING),  // Array de strings
      allowNull: true,
    },
  },
  {
    sequelize,  // Passa a instância correta de Sequelize
    modelName: 'User',
    tableName: 'users',  // Nome da tabela no banco de dados
    timestamps: true,    // Inclui as colunas createdAt e updatedAt
  }
);

export default User;
