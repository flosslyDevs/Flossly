import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const RewardPoint = sequelize.define(
  "RewardPoints",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM(
        "Task",
        "HR",
        "CPD",
        "Docs"
      ),
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    modelName: "RewardPoints",
    timestamps: true,
  }
);
