import { DataTypes } from "sequelize";
import sequelize  from "../utils/db";
export const DefaultStatus = sequelize.define(
  "DefaultStatuses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    modelName: "DefaultStatuses",
    timestamps: true,
  }
);
