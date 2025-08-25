import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const UserContract = sequelize.define(
  "UserContracts",
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
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Organisations",
        key: "id",
      },
    },
    contractType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    contractStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    weeklyHours: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    salaryPerHour: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    probEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    holidaysEntitled: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    modelName: "UserContracts",
    timestamps: true,
  }
);
