import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";
export const UserLeaveEntitlement = sequelize.define(
  "UserLeaveEntitlements",
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
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Organisations",
        key: "id"
      }
    },
    allowedAnnualLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    takenAnnualLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    allowedCasualLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    takenCasualLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    allowedSickLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    takenSickLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    allowedCompationateLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    takenCompationateLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    allowedOtherLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    takenOtherLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    modelName: "UserLeaveEntitlements",
    timestamps: true,
  }
);
