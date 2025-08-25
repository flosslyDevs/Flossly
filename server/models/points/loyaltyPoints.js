import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const LoyaltyPoint = sequelize.define(
  "LoyaltyPoints",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
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
    image: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    modelName: "LoyaltyPoints",
    timestamps: true,
  }
);
