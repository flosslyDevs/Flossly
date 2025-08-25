import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserPointsHistory = sequelize.define(
  "UserPointsHistory",
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
        key: "id",
      },
    },
    rewardPointId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "RewardPoints",
        key: "id",
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    modelName: "UserPointsHistory",
    timestamps: true,
  }
);
