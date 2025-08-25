import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const LoginHistory = sequelize.define(
  "LoginHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    browserAgent: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    modelName: "LoginHistory",
    timestamps: true,
  }
);
