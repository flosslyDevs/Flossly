import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserAccount = sequelize.define(
  "UserAccounts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    bankName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sortCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    accountNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    accountTitle: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    modelName: "UserAccount",
    timestamps: true,
  }
);