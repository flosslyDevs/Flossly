import { DataTypes } from "sequelize";
import sequelize  from "../utils/db";
export const DefaultPriority = sequelize.define(
  "DefaultPriorities",
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
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "DefaultPriorities",
    timestamps: true,
  }
);
