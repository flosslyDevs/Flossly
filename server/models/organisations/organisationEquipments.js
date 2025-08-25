import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const OrganisationEquipment = sequelize.define(
  "OrganisationEquipments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    serialNumber: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Organisations",
        key: "id"
      }
    },
  },
  {
    modelName: "OrganisationEquipments",
    timestamps: true,
  }
);
