import { DataTypes } from "sequelize";
import sequelize from "../../utils/db";

export const OrganisationContact = sequelize.define(
  "OrganisationContacts",
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
    contact: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
    modelName: "OrganisationContacts",
    timestamps: true,
  }
);
