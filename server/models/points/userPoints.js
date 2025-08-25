import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserPoint = sequelize.define(
  "UserPoints",
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
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPointsRewarded: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    redeemed: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    modelName: "UserPoints",
    timestamps: true,
  }
);